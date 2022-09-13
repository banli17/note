import { rollup, watch } from "rollup";

const inputOptions = {
  // core input options
  external: [],
  input: {
    index: "./src/index.js",
  }, // conditionally required
  plugins: [],

  // advanced input options
  // cache,
  // onwarn,
  // preserveEntrySignatures,
  // strictDeprecations,

  // danger zone
  // acorn,
  // acornInjectPlugins,
  // context,
  // moduleContext,
  // preserveSymlinks,
  // shimMissingExports,
  // treeshake,

  // experimental
  // experimentalCacheExpiry,
  // perf
};

const outputOptionList = [
  {
    dir: "dist",
    entryFileNames: "[name].esm.js",
    format: "esm",
  },
];

build();

async function build() {
  let bundle;
  let buildFailed = false;

  try {
    bundle = await rollup(inputOptions);

    console.log(bundle.watchFiles);

    const watcher = watch(inputOptions);

    watcher.on("event", (event) => {
      // event.code can be one of:
      //   START        — the watcher is (re)starting
      //   BUNDLE_START — building an individual bundle
      //                  * event.input will be the input options object if present
      //                  * event.output contains an array of the "file" or
      //                    "dir" option values of the generated outputs
      //   BUNDLE_END   — finished building a bundle
      //                  * event.input will be the input options object if present
      //                  * event.output contains an array of the "file" or
      //                    "dir" option values of the generated outputs
      //                  * event.duration is the build duration in milliseconds
      //                  * event.result contains the bundle object that can be
      //                    used to generate additional outputs by calling
      //                    bundle.generate or bundle.write. This is especially
      //                    important when the watch.skipWrite option is used.
      //                  You should call "event.result.close()" once you are done
      //                  generating outputs, or if you do not generate outputs.
      //                  This will allow plugins to clean up resources via the
      //                  "closeBundle" hook.
      //   END          — finished building all bundles
      //   ERROR        — encountered an error while bundling
      //                  * event.error contains the error that was thrown
      //                  * event.result is null for build errors and contains the
      //                    bundle object for output generation errors. As with
      //                    "BUNDLE_END", you should call "event.result.close()" if
      //                    present once you are done.
    });

    // This will make sure that bundles are properly closed after each run
    watcher.on("event", ({ result }) => {
      if (result) {
        result.close();
      }
    });

    // stop watching
    // watcher.close();

    await generateOutputs(bundle);
  } catch (err) {
    buildFailed = true;
    console.error(err);
  }

  if (bundle) {
    await bundle.close();
  }

  process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
  for (const outputOptions of outputOptionList) {
    // generte 会生成到内存, write 会生成到文件中
    // const { output } = await bundle.generate(outputOptions);
    const { output } = await bundle.write(outputOptions);

    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === "asset") {
        // For assets, this contains
        // {
        //   fileName: string,              // the asset file name
        //   source: string | Uint8Array    // the asset source
        //   type: 'asset'                  // signifies that this is an asset
        // }
        console.log("Asset", chunkOrAsset);
      } else {
        // For chunks, this contains
        // {
        //   code: string,                  // the generated JS code
        //   dynamicImports: string[],      // external modules imported dynamically by the chunk
        //   exports: string[],             // exported variable names
        //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
        //   fileName: string,              // the chunk file name
        //   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
        //   imports: string[],             // external modules imported statically by the chunk
        //   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
        //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
        //   isEntry: boolean,              // is this chunk a static entry point
        //   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
        //   map: string | null,            // sourcemaps if present
        //   modules: {                     // information about the modules in this chunk
        //     [id: string]: {
        //       renderedExports: string[]; // exported variable names that were included
        //       removedExports: string[];  // exported variable names that were removed
        //       renderedLength: number;    // the length of the remaining code in this module
        //       originalLength: number;    // the original length of the code in this module
        //       code: string | null;       // remaining code in this module
        //     };
        //   },
        //   name: string                   // the name of this chunk as used in naming patterns
        //   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
        //   type: 'chunk',                 // signifies that this is a chunk
        // }
        console.log("Chunk", chunkOrAsset.modules);
      }
    }
  }
}
