import { Checkbox } from "ariakit/checkbox";
import { Group, GroupLabel } from "ariakit/group";
import { ICheckboxProps } from "interfaces/formInterfaces";
import Image, { StaticImageData } from "next/image";

export function CheckboxGroup({
    label,
    description,
    values,
    enabledValues,
    images = false,
    handleChange,
}: ICheckboxProps) {
    let isDisabled;

    return (
        <Group>
            <GroupLabel className="label input-label">{label}</GroupLabel>
            {description && <div className="input-label text-xs text-base-content/50 mb-2">{description}</div>}
            <div className="flex flex-row gap-6 flex-wrap">
                {values.map((value) => {
                    if (enabledValues) {
                        isDisabled = !enabledValues.includes(value);
                    }

                    return (
                        <label key={value.toUpperCase()}>
                            <Checkbox
                                as="div"
                                value={value}
                                className={"checkbox-field"}
                                onChange={handleChange}
                                disabled={isDisabled}
                            >
                                {value}
                            </Checkbox>
                        </label>
                    );
                })}
            </div>
        </Group>
    );
}
