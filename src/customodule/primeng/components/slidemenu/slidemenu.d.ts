import { ElementRef, AfterViewChecked, OnDestroy, Renderer2 } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
export declare class SlideMenuSub implements OnDestroy {
    slideMenu: SlideMenu;
    item: MenuItem;
    root: boolean;
    backLabel: string;
    menuWidth: number;
    effectDuration: any;
    easing: string;
    index: number;
    constructor(slideMenu: SlideMenu);
    activeItem: any;
    itemClick(event: any, item: MenuItem, listitem: any): void;
    ngOnDestroy(): void;
}
export declare class SlideMenu implements AfterViewChecked, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    menuWidth: number;
    viewportHeight: number;
    effectDuration: any;
    easing: string;
    backLabel: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    containerViewChild: ElementRef;
    backwardViewChild: ElementRef;
    slideMenuContentViewChild: ElementRef;
    documentClickListener: any;
    documentResizeListener: any;
    preventDocumentDefault: boolean;
    left: number;
    animating: boolean;
    target: any;
    visible: boolean;
    viewportUpdated: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
    ngAfterViewChecked(): void;
    container: ElementRef;
    backward: ElementRef;
    slideMenuContent: ElementRef;
    updateViewPort(): void;
    toggle(event: any): void;
    show(event: any): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    moveOnTop(): void;
    hide(): void;
    onWindowResize(): void;
    onClick(event: any): void;
    goBack(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    ngOnDestroy(): void;
}
export declare class SlideMenuModule {
}