import { TestContext } from "@manuth/extended-yo-generator-test";
import { TSGeneratorDescriptionQuestion } from "../../../../generators/generator/Inquiry/TSGeneratorDescriptionQuestion";
import { TSGeneratorModuleNameQuestion } from "../../../../generators/generator/Inquiry/TSGeneratorModuleNameQuestion";
import { TSGeneratorQuestionCollection } from "../../../../generators/generator/Inquiry/TSGeneratorQuestionCollection";
import { ITSGeneratorSettings } from "../../../../generators/generator/Settings/ITSGeneratorSettings";
import { TSGeneratorGenerator } from "../../../../generators/generator/TSGeneratorGenerator";

/**
 * Registers tests for the `TSGeneratorQuestionCollection` class.
 *
 * @param context
 * The text-context.
 */
export function TSGeneratorQuestionCollectionTests(context: TestContext<TSGeneratorGenerator>): void
{
    suite(
        "TSGeneratorQuestionCollection",
        () =>
        {
            let collection: TSGeneratorQuestionCollection<ITSGeneratorSettings>;

            suiteSetup(
                () =>
                {
                    collection = new TSGeneratorQuestionCollection();
                });

            test(
                "Checking whether all necessary questions are present…",
                () =>
                {
                    for (let questionType of [TSGeneratorModuleNameQuestion, TSGeneratorDescriptionQuestion])
                    {
                        collection.Questions.some(
                            (question) =>
                            {
                                return question instanceof questionType;
                            });
                    }
                });
        });
}
