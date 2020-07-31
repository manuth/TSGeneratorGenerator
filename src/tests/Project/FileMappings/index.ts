import { TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectGenerator } from "../../../Project/TSProjectGenerator";
import { NPMIgnoreFileMappingTests } from "./NPMIgnoreFileMapping.test";
import { NPMPackagingTests } from "./NPMPackaging";
import { VSCodeTests } from "./VSCode";

/**
 * Registers tests for `TSProject` file-mappings.
 *
 * @param context
 * The test-context.
 */
export function FileMappingTests(context: TestContext<TSProjectGenerator>): void
{
    suite(
        "FileMappings",
        () =>
        {
            NPMIgnoreFileMappingTests(context);
            NPMPackagingTests(context);
            VSCodeTests(context);
        });
}
