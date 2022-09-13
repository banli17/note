import { fileURLToPath } from "url";
import path from "path";
import { rollup, watch } from "rollup";
import loadConfigFile from "rollup/loadConfigFile";

// load the config file next to the current script;
// the provided config object has the same effect as passing "--format es"
// on the command line and will override the format of all outputs
loadConfigFile(
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "rollup.config.js"
  ),
  {
    format: "es",
  }
).then(async ({ options, warnings }) => {
  // "warnings" wraps the default `onwarn` handler passed by the CLI.
  // This prints all warnings up to this point:
  console.log(`We currently have ${warnings.count} warnings`);

  // This prints all deferred warnings
  warnings.flush();

  // options is an array of "inputOptions" objects with an additional "output"
  // property that contains an array of "outputOptions".
  // The following will generate all outputs for all inputs, and write them to disk the same
  // way the CLI does it:
  for (const optionsObj of options) {
    const bundle = await rollup(optionsObj);
    await Promise.all(optionsObj.output.map(bundle.write));
  }

  // You can also pass this directly to "rollup.watch"
  watch(options);
});
