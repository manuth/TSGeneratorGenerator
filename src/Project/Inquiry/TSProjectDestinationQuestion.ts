import { resolve } from "path";
import { IGenerator } from "@manuth/extended-yo-generator";
import { InputQuestionOptions } from "inquirer";
import { isAbsolute } from "upath";
import { QuestionBase } from "../../Components/Inquiry/QuestionBase";
import { ITSProjectSettings } from "../Settings/ITSProjectSettings";
import { TSProjectSettingKey } from "../Settings/TSProjectSettingKey";

/**
 * Provides a question for asking for the destination-path of a project.
 */
export class TSProjectDestinationQuestion<T extends ITSProjectSettings> extends QuestionBase<T> implements InputQuestionOptions<T>
{
    /**
     * @inheritdoc
     */
    public type = "input" as const;

    /**
     * @inheritdoc
     */
    public name = TSProjectSettingKey.Destination;

    /**
     * Initializes a new instance of the `TSProjectDestinationQuestion<T>` class.
     *
     * @param generator
     * The generator of the question.
     */
    public constructor(generator: IGenerator<T>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The message to show to the user.
     */
    public async message(answers: T): Promise<string>
    {
        return "Where do you want to save your project to?";
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The default value.
     */
    public async default(answers: T): Promise<string>
    {
        return "./";
    }

    /**
     * @inheritdoc
     *
     * @param input
     * The input provided by the user.
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The filtered value.
     */
    public async filter(input: any, answers?: T): Promise<string>
    {
        return isAbsolute(input) ? input : resolve(this.Generator.destinationPath(input));
    }
}
