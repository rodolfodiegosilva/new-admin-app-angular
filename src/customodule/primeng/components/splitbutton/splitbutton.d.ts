import { ElementRef, OnDestroy, EventEmitter, Renderer2, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
import { Router } from '@angular/router';
export declare class SplitButton implements OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    router: Router;
    cd: ChangeDetectorRef;
    model: MenuItem[];
    icon: string;
    iconPos: string;
    label: string;
    onClick: EventEmitter<any>;
    onDropdownClick: EventEmitter<any>;
    style: any;
    styleClass: string;
    menuStyle: any;
    menuStyleClass: string;
    disabled: boolean;
    tabindex: number;
    appendTo: any;
    dir: string;
    containerViewChild: ElementRef;
    buttonViewChild: ElementRef;
    overlay: HTMLDivElement;
    overlayVisible: boolean;
    documentClickListener: any;
    dropdownClick: boolean;
    shown: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, router: Router, cd: ChangeDetectorRef);
    onDefaultButtonClick(event: Event): void;
    itemClick(event: Event, item: MenuItem): void;
    show(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    onDropdownButtonClick(event: Event): void;
    alignOverlay(): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class SplitButtonModule {
}
