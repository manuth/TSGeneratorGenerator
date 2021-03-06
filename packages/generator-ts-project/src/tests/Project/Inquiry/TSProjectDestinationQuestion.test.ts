import { strictEqual } from "assert";
import { resolve } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TempDirectory } from "@manuth/temp-files";
import { popd, pushd } from "util.chdir";
import { TSProjectDestinationQuestion } from "../../../Project/Inquiry/TSProjectDestinationQuestion";
import { ITSProjectSettings } from "../../../Project/Settings/ITSProjectSettings";
import { TSProjectGenerator } from "../../../Project/TSProjectGenerator";
import { TestContext } from "../../TestContext";

/**
 * Registers tests for the `TSProjectDestinationQuestion` class.
 *
 * @param context
 * The test-context.
 */
export function TSProjectDestinationQuestionTests(context: TestContext<TSProjectGenerator>): void
{
    suite(
        "TSProjectDestinationQuestion",
        () =>
        {
            let tempDir: TempDirectory;
            let generator: TSProjectGenerator;
            let question: TSProjectDestinationQuestion<ITSProjectSettings, GeneratorOptions>;

            suiteSetup(
                async function()
                {
                    this.timeout(0);
                    tempDir = new TempDirectory();
                    generator = await context.Generator;
                    question = new TSProjectDestinationQuestion(generator);
                });

            test(
                "Checking whether the question default to the generator-destinationpath…",
                async () =>
                {
                    strictEqual(await question.default(generator.Settings), "./");
                });

            test(
                "Checking whether the filtered value isn't affected by the current working-directory…",
                async () =>
                {
                    let path = ".";
                    let expected = resolve(generator.destinationPath(path));
                    strictEqual(await question.filter(path, generator.Settings), expected);
                    pushd(tempDir.FullName);
                    strictEqual(await question.filter(path, generator.Settings), expected);
                    popd();
                });
        });
}
