import {Directive, ElementRef, Input, AfterViewInit} from '@angular/core';


@Directive({
    selector : '[tooltip]'
})

export class TooltipDirective implements AfterViewInit {
    @Input('tooltip') tooltip: string;
    @Input('tooltip_style') 'tooltip_style': string;

    private container = document.createElement('div');

    constructor(private el: ElementRef) {

    }

    normalizeData() {
        this['tooltip_style'] = this['tooltip_style'] || '';
        if (!this['tooltip_style']) {
            this.tooltip = this.tooltip.replace(/^(\w+):/, (match, style) => {
                this['tooltip_style'] = style;
                return '';
            });
        }
    }

    injectDom() {
        this.container.className   = `tooltip-inner on-hover ${this['tooltip_style']}`;
        this.container.textContent = this.tooltip;
        this.el.nativeElement.classList.add('tooltip');
        this.el.nativeElement.appendChild(this.container);
    }

    ngAfterViewInit() {
        this.normalizeData();
        this.injectDom();
    }
}
