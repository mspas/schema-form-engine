import { Injectable } from '@angular/core';
import { FormSchema, GroupFieldSchema } from '../schema/form-schema.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlSchema } from '../schema/form-control.model';

@Injectable()
export class FormBuilderService {
  buildForm(schema: FormSchema | GroupFieldSchema): FormGroup {
    const controls: Record<string, FormControl> = {};

    const collectControls = (node: FormSchema | GroupFieldSchema) => {
      for (const item of node.controls) {
        if (this.isGroupFieldSchema(item)) {
          collectControls(item);
        } else {
          controls[item.controlName] = new FormControl({
            value: item.initialValue ?? null,
            disabled: false,
          });
        }
      }
    };

    collectControls(schema);
    return new FormGroup(controls);
  }

  private isGroupFieldSchema(
    obj: GroupFieldSchema | ControlSchema,
  ): obj is GroupFieldSchema {
    return 'controls' in obj;
  }
}
