import { CodeWorkspaceComponent } from "../../VSCode/Components/CodeWorkspaceComponent";
import { SettingsProcessor } from "../../VSCode/SettingsProcessor";
import { ITSProjectSettings } from "../Settings/ITSProjectSettings";

/**
 * Provides the functionality to process settings for `TSProject`s.
 */
export class TSProjectSettingsProcessor<T extends ITSProjectSettings> extends SettingsProcessor<T>
{
    /**
     * Initializes a new instance of the `TSProjectSettingsProcessor` class.
     *
     * @param component
     * The component of the processor.
     */
    public constructor(component: CodeWorkspaceComponent<T>)
    {
        super(component);
    }

    /**
     * @inheritdoc
     *
     * @param key
     * The key of the setting
     *
     * @returns
     * A value indicating whether the setting with the specified key should be included.
     */
    protected async FilterSettingKey(key: string): Promise<boolean>
    {
        return key !== "files.associations";
    }
}