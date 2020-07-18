import { IComponent } from "@manuth/extended-yo-generator";
import { TSProjectGeneralCategory } from "../../../Project/Components/TSProjectGeneralCategory";
import { ITSProjectSettings } from "../../../Project/Settings/ITSProjectSettings";
import { TSModuleCodeWorkspace } from "./TSModuleCodeWorkspace";

/**
 * Provides general components for `TSModule`s.
 */
export class TSModuleGeneralCategory<T extends ITSProjectSettings> extends TSProjectGeneralCategory<T>
{
    /**
     * Initializes a new instance of the `TSModuleGeneralCategory<T>` class.
     */
    public constructor()
    {
        super();
    }

    /**
     * @inheritdoc
     */
    protected get WorkspaceComponent(): IComponent<T>
    {
        return new TSModuleCodeWorkspace();
    }
}
