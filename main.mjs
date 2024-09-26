import { v2, auth } from "osu-api-extended";
import * as prompts from "@clack/prompts";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  prompts.intro("Welcome to the osu! Player Info CLI");

  try {
    const authSpinner = prompts.spinner();
    authSpinner.start("Authenticating with osu API...");

    await auth.login(process.env.CLIENT_ID, process.env.CLIENT_SECRET, [
      "public",
    ]);

    authSpinner.stop(chalk.green("Authenticated successfully!"));

    const playerName = await prompts.text({
      message: "Enter player name:",
      validate: (value) => (value ? undefined : "Player name cannot be empty!"),
    });

    const gameMode = await prompts.select({
      message: "Choose a game mode:",
      options: [
        { label: "osu", value: "osu" },
        { label: "taiko", value: "taiko" },
        { label: "fruits", value: "fruits" },
        { label: "mania", value: "mania" },
      ],
    });

    const dataSpinner = prompts.spinner();
    dataSpinner.start(
      `Fetching data for player ${playerName} in ${gameMode} mode...`
    );

    const data = await v2.user.details(playerName, gameMode, "username");

    dataSpinner.stop(
      chalk.green(`Data fetched successfully for ${playerName}!`)
    );

    console.log(
      chalk.bold.underline(
        `\nPlayer Information for ${chalk.yellow(data.username)} (${chalk.green(
          data.country.name
        )}):`
      )
    );
    console.log(`- ${chalk.bold("Username")}: ${chalk.yellow(data.username)}`);
    console.log(
      `- ${chalk.bold("Avatar URL")}: ${chalk.blue(data.avatar_url)}`
    );
    console.log(
      `- ${chalk.bold("Country")}: ${chalk.green(data.country.name)} (${
        data.country.code
      })`
    );
    console.log(
      `- ${chalk.bold("Global Rank")}: ${chalk.magenta(
        data.statistics.global_rank || "Unranked"
      )}`
    );
    console.log(
      `- ${chalk.bold("Country Rank")}: ${chalk.magenta(
        data.statistics.rank.country || "Unranked"
      )}`
    );
    console.log(
      `- ${chalk.bold("Play Count")}: ${chalk.cyan(data.statistics.play_count)}`
    );
    console.log(
      `- ${chalk.bold("Accuracy")}: ${chalk.cyan(
        data.statistics.hit_accuracy.toFixed(2)
      )}%`
    );
    console.log(
      `- ${chalk.bold("Total Score")}: ${chalk.green(
        data.statistics.total_score.toLocaleString()
      )}`
    );
    console.log(
      `- ${chalk.bold("Maximum Combo")}: ${chalk.cyan(
        data.statistics.maximum_combo
      )}`
    );
    console.log(
      `- ${chalk.bold("Ranked Score")}: ${chalk.green(
        data.statistics.ranked_score.toLocaleString()
      )}`
    );
    console.log(
      `- ${chalk.bold("Play Time")}: ${chalk.yellow(
        (data.statistics.play_time / 3600).toFixed(2)
      )} hours`
    );
    console.log(
      `- ${chalk.bold("Level")}: ${chalk.blue(
        data.statistics.level.current
      )} (${data.statistics.level.progress}% progress)`
    );
    console.log(
      `- ${chalk.bold("Achievements")}: ${chalk.cyan(
        data.user_achievements.length
      )}`
    );
    console.log(
      `- ${chalk.bold("Follower Count")}: ${chalk.yellow(data.follower_count)}`
    );
    console.log(
      `- ${chalk.bold("Join Date")}: ${chalk.cyan(
        new Date(data.join_date).toDateString()
      )}`
    );
    console.log(
      `- ${chalk.bold("Last Visit")}: ${chalk.cyan(
        new Date(data.last_visit).toDateString()
      )}`
    );
    console.log(
      `- ${chalk.bold("Is Online")}: ${
        data.is_online ? chalk.green("Yes") : chalk.red("No")
      }`
    );
    console.log(
      `- ${chalk.bold("Website")}: ${chalk.blue(data.website || "No website")}`
    );

    if (data.badges.length > 0) {
      console.log(chalk.bold.underline(`\nBadges:`));
      data.badges.forEach((badge, index) => {
        console.log(
          `  ${chalk.bold(index + 1)}. ${chalk.yellow(
            badge.description
          )} (${chalk.cyan(new Date(badge.awarded_at).toDateString())})`
        );
      });
    }
  } catch (error) {
    prompts.outro(chalk.red(`An error occurred: ${error.message}`));
    return;
  }

  prompts.outro(chalk.green("Thank you for using the osu! Player Info CLI!"));
};

main();
