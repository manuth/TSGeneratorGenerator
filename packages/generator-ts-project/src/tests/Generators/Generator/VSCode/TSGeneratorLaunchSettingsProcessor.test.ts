import { ok } from "assert";
import { GeneratorOptions, GeneratorSettingKey } from "@manuth/extended-yo-generator";
import { TSGeneratorCodeWorkspaceFolder } from "../../../../generators/generator/Components/TSGeneratorCodeWorkspaceFolder";
import { ITSGeneratorSettings } from "../../../../generators/generator/Settings/ITSGeneratorSettings";
import { SubGeneratorSettingKey } from "../../../../generators/generator/Settings/SubGeneratorSettingKey";
import { TSGeneratorComponent } from "../../../../generators/generator/Settings/TSGeneratorComponent";
import { TSGeneratorSettingKey } from "../../../../generators/generator/Settings/TSGeneratorSettingKey";
import { TSGeneratorGenerator } from "../../../../generators/generator/TSGeneratorGenerator";
import { TSGeneratorLaunchSettingsProcessor } from "../../../../generators/generator/VSCode/TSGeneratorLaunchSettingsProcessor";
import { TSProjectComponent } from "../../../../Project/Settings/TSProjectComponent";
import { CodeWorkspaceComponent } from "../../../../VSCode/Components/CodeWorkspaceComponent";
import { TestContext } from "../../../TestContext";

/**
 * Registers tests for the `TSGeneratorLaunchSettingsProcessor` class.
 *
 * @param context
 * The test-context.
 */
export function TSGeneratorLaunchSettingsProcessorTests(context: TestContext<TSGeneratorGenerator>): void
{
    suite(
        "TSGeneratorLaunchSettingsProcessor",
        () =>
        {
            let settings: Partial<ITSGeneratorSettings>;
            let component: CodeWorkspaceComponent<ITSGeneratorSettings, GeneratorOptions>;
            let processor: TSGeneratorLaunchSettingsProcessor<ITSGeneratorSettings, GeneratorOptions>;

            suiteSetup(
                async function()
                {
                    this.timeout(0);

                    settings = {
                        [GeneratorSettingKey.Components]: [
                            TSProjectComponent.VSCode,
                            TSGeneratorComponent.GeneratorExample,
                            TSGeneratorComponent.SubGeneratorExample
                        ],
                        [TSGeneratorSettingKey.SubGenerators]: [
                            {
                                [SubGeneratorSettingKey.DisplayName]: "A",
                                [SubGeneratorSettingKey.Name]: "a"
                            },
                            {
                                [SubGeneratorSettingKey.DisplayName]: "B",
                                [SubGeneratorSettingKey.Name]: "b"
                            }
                        ]
                    };

                    component = new TSGeneratorCodeWorkspaceFolder(await context.Generator);
                    processor = new TSGeneratorLaunchSettingsProcessor(component);
                });

            setup(
                () =>
                {
                    Object.assign(processor.Generator.Settings, settings);
                });

            test(
                "Checking whether a launch-configuration for each generator is present…",
                async () =>
                {
                    let launchSettings = await processor.Process(await component.Source.LaunchMetadata);
                    let debugConfigs = launchSettings.configurations ?? [];

                    ok(
                        debugConfigs.some(
                            (debugConfig) =>
                            {
                                return debugConfig.name === "Launch Yeoman";
                            }));

                    ok(
                        settings[TSGeneratorSettingKey.SubGenerators].every(
                            (subGeneratorOptions) =>
                            {
                                return debugConfigs.some(
                                    (debugConfig) =>
                                    {
                                        return debugConfig.name.includes(`${subGeneratorOptions[SubGeneratorSettingKey.DisplayName]} generator`);
                                    });
                            }));
                });
        });
}
