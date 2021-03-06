import { ElementRef, OnDestroy, EventEmitter, Renderer2, QueryList, NgZone } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DomHandler } from '../dom/domhandler';
import { Header } from '../common/shared';
export declare class Dialog implements OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    zone: NgZone;
    visible: boolean;
    header: string;
    draggable: boolean;
    resizable: boolean;
    minWidth: number;
    minHeight: number;
    width: any;
    height: any;
    positionLeft: number;
    positionTop: number;
    contentStyle: any;
    modal: boolean;
    closeOnEscape: boolean;
    dismissableMask: boolean;
    rtl: boolean;
    closable: boolean;
    responsive: boolean;
    appendTo: any;
    style: any;
    styleClass: string;
    showHeader: boolean;
    breakpoint: number;
    blockScroll: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    minX: number;
    minY: number;
    focusOnShow: boolean;
    maximizable: boolean;
    headerFacet: QueryList<Header>;
    footerFacet: QueryList<Header>;
    headerViewChild: ElementRef;
    contentViewChild: ElementRef;
    footerViewChild: ElementRef;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    visibleChange: EventEmitter<any>;
    container: HTMLDivElement;
    _visible: boolean;
    dragging: boolean;
    documentDragListener: any;
    documentDragEndListener: any;
    resizing: boolean;
    documentResizeListener: any;
    documentResizeEndListener: any;
    documentResponsiveListener: any;
    documentEscapeListener: Function;
    maskClickListener: Function;
    lastPageX: number;
    lastPageY: number;
    mask: HTMLDivElement;
    closeIconMouseDown: boolean;
    preWidth: number;
    preventVisibleChangePropagation: boolean;
    maximized: boolean;
    preMaximizeContentHeight: number;
    preMaximizeContainerWidth: number;
    preMaximizeContainerHeight: number;
    preMaximizePageX: number;
    preMaximizePageY: number;
    id: string;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, zone: NgZone);
    focus(): void;
    positionOverlay(): void;
    close(event: Event): void;
    center(): void;
    enableModality(): void;
    disableModality(): void;
    toggleMaximize(event: any): void;
    maximize(): void;
    revertMaximize(): void;
    unbindMaskClickListener(): void;
    moveOnTop(): void;
    onCloseMouseDown(event: Event): void;
    initDrag(event: MouseEvent): void;
    onDrag(event: MouseEvent): void;
    endDrag(event: MouseEvent): void;
    initResize(event: MouseEvent): void;
    onResize(event: MouseEvent): void;
    onResizeEnd(event: MouseEvent): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    bindDocumentDragListener(): void;
    unbindDocumentDragListener(): void;
    bindDocumentDragEndListener(): void;
    unbindDocumentDragEndListener(): void;
    bindDocumentResizeListeners(): void;
    unbindDocumentResizeListeners(): void;
    bindDocumentResponsiveListener(): void;
    unbindDocumentResponsiveListener(): void;
    onWindowResize(event: any): void;
    bindDocumentEscapeListener(): void;
    unbindDocumentEscapeListener(): void;
    appendContainer(): void;
    restoreAppend(): void;
    onAnimationStart(event: AnimationEvent): void;
    ngOnDestroy(): void;
}
export declare class DialogModule {
}
