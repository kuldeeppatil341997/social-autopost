import {Config} from "@remotion/cli/config";
// Uses the system Chrome when present (GitHub's Ubuntu runners have it); otherwise Remotion downloads its own.
import fs from "fs";
if (fs.existsSync(process.env.CHROME_PATH || "/usr/bin/google-chrome")) Config.setBrowserExecutable(process.env.CHROME_PATH || "/usr/bin/google-chrome");
Config.setChromiumOpenGlRenderer("swangle");
