import { TemplateRef } from '@angular/core';

export class RendererTemplateRegistry<TModel extends object> {
  private registry = new Map<string, TemplateRef<TModel>>();

  register(type: string, template: TemplateRef<TModel>) {
    this.registry.set(type, template);
  }

  get(type: string): TemplateRef<TModel> {
    const template = this.registry.get(type);

    if (!template) {
      throw new Error(`No template for type ${type}`);
    }

    return template;
  }
}
