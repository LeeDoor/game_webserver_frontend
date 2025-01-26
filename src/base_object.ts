import { BaseViewport } from "./base_viewport.js"
export abstract class BaseObject {
    abstract draw(vp: BaseViewport): void;
}
