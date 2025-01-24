import { ClickableGrid } from './base_grid.js'
import { BaseViewport } from './base_viewport.js'

export class Grid extends ClickableGrid {

    constructor(vp: BaseViewport) {
        super(vp);
    }
}
