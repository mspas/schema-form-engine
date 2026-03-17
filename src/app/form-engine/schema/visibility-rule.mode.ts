export interface VisibilityRule<TModel> {
  dependsOn: keyof TModel;
  equals?: unknown;
}
