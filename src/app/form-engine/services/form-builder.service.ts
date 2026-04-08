import { Injectable } from '@angular/core';
import { FormSchema, GroupFieldSchema } from '../schema/form-schema.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlSchema } from '../schema/form-control.model';

@Injectable()
export class FormBuilderService {
  buildForm(schema: FormSchema): FormGroup {
    const controls: Record<string, FormControl> = {};

    const collectControls = (node: FormSchema | GroupFieldSchema) => {
      for (const item of node.controls) {
        if (this.isGroupFieldSchema(item)) {
          collectControls(item);
        } else {
          controls[item.controlName] = new FormControl(
            item.initialValue ?? null,
            {
              updateOn: item.updateOn ?? schema.updateOn,
            },
          );
        }
      }
    };

    collectControls(schema);
    return new FormGroup(controls, { updateOn: schema.updateOn });
  }

  private isGroupFieldSchema(
    obj: GroupFieldSchema | ControlSchema,
  ): obj is GroupFieldSchema {
    return 'controls' in obj;
  }
}
