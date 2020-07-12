import { ITSProjectSettings } from "../../ITSProjectSettings";
import { VSCodeExtensionsMapping } from "./VSCodeExtensionsMapping";
import { CodeWorkspaceComponent } from "../../Components/CodeWorkspaceComponent";

/**
 * Provides a file-mapping for copying the `extensions.json` file.
 */
export class ProjectExtensionsMapping<T extends ITSProjectSettings> extends VSCodeExtensionsMapping<T>
{
    /**
     * Initializes a new instance of the `ProjectExtensionsMapping` class.
     *
     * @param codeWorkspaceComponent
     * The workspace-component of this file-mapping.
     */
    public constructor(codeWorkspaceComponent?: CodeWorkspaceComponent<T>)
    {
        super(codeWorkspaceComponent);
    }

    /**
     * @inheritdoc
     *
     * @param recommendations
     * The recommendations to filter.
     *
     * @returns
     * All necessary recommendations.
     */
    protected async FilterRecommendations(recommendations: string[]): Promise<string[]>
    {
        return recommendations.filter(
            (extension) =>
            {
                return extension !== "qdigitalbrainstem.javascript-ejs-support";
            });
    }
}
