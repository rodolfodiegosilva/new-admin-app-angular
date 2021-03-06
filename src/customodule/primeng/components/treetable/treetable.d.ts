import { AfterContentInit, OnInit, OnDestroy, EventEmitter, TemplateRef, QueryList, ElementRef, NgZone, AfterViewInit, AfterViewChecked } from '@angular/core';
import { TreeNode } from '../common/treenode';
import { Subscription, Observable } from 'rxjs';
import { DomHandler } from '../dom/domhandler';
import { PrimeTemplate } from '../common/shared';
import { SortMeta } from '../common/sortmeta';
import { ObjectUtils } from '../utils/objectutils';
export declare class TreeTableService {
    private sortSource;
    private selectionSource;
    private contextMenuSource;
    private uiUpdateSource;
    sortSource$: Observable<SortMeta | SortMeta[]>;
    selectionSource$: Observable<{}>;
    contextMenuSource$: Observable<any>;
    uiUpdateSource$: Observable<any>;
    onSort(sortMeta: SortMeta | SortMeta[]): void;
    onSelectionChange(): void;
    onContextMenu(node: any): void;
    onUIUpdate(value: any): void;
}
export declare class TreeTable implements AfterContentInit, OnInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    objectUtils: ObjectUtils;
    zone: NgZone;
    tableService: TreeTableService;
    columns: any[];
    style: any;
    styleClass: string;
    autoLayout: boolean;
    lazy: boolean;
    paginator: boolean;
    rows: number;
    first: number;
    totalRecords: number;
    pageLinks: number;
    rowsPerPageOptions: number[];
    alwaysShowPaginator: boolean;
    paginatorPosition: string;
    paginatorDropdownAppendTo: any;
    defaultSortOrder: number;
    sortMode: string;
    resetPageOnSort: boolean;
    customSort: boolean;
    selectionMode: string;
    selectionChange: EventEmitter<any>;
    contextMenuSelection: any;
    contextMenuSelectionChange: EventEmitter<any>;
    contextMenuSelectionMode: string;
    dataKey: string;
    metaKeySelection: boolean;
    compareSelectionBy: string;
    rowHover: boolean;
    loading: boolean;
    loadingIcon: string;
    scrollable: boolean;
    scrollHeight: string;
    frozenWidth: string;
    frozenColumns: any[];
    resizableColumns: boolean;
    columnResizeMode: string;
    reorderableColumns: boolean;
    contextMenu: any;
    rowTrackBy: Function;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    onPage: EventEmitter<any>;
    onSort: EventEmitter<any>;
    onLazyLoad: EventEmitter<any>;
    sortFunction: EventEmitter<any>;
    onColResize: EventEmitter<any>;
    onColReorder: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onContextMenuSelect: EventEmitter<any>;
    onHeaderCheckboxToggle: EventEmitter<any>;
    onEditInit: EventEmitter<any>;
    onEditComplete: EventEmitter<any>;
    onEditCancel: EventEmitter<any>;
    containerViewChild: ElementRef;
    resizeHelperViewChild: ElementRef;
    reorderIndicatorUpViewChild: ElementRef;
    reorderIndicatorDownViewChild: ElementRef;
    tableViewChild: ElementRef;
    templates: QueryList<PrimeTemplate>;
    _value: TreeNode[];
    serializedValue: any[];
    _multiSortMeta: SortMeta[];
    _sortField: string;
    _sortOrder: number;
    colGroupTemplate: TemplateRef<any>;
    captionTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    bodyTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    summaryTemplate: TemplateRef<any>;
    emptyMessageTemplate: TemplateRef<any>;
    paginatorLeftTemplate: TemplateRef<any>;
    paginatorRightTemplate: TemplateRef<any>;
    frozenHeaderTemplate: TemplateRef<any>;
    frozenBodyTemplate: TemplateRef<any>;
    frozenFooterTemplate: TemplateRef<any>;
    frozenColGroupTemplate: TemplateRef<any>;
    lastResizerHelperX: number;
    reorderIconWidth: number;
    reorderIconHeight: number;
    draggedColumn: any;
    dropPosition: number;
    preventSelectionSetterPropagation: boolean;
    _selection: any;
    selectionKeys: any;
    rowTouched: boolean;
    editingCell: Element;
    initialized: boolean;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    constructor(el: ElementRef, domHandler: DomHandler, objectUtils: ObjectUtils, zone: NgZone, tableService: TreeTableService);
    value: any[];
    updateSerializedValue(): void;
    serializeNodes(parent: any, nodes: any, level: any, visible: any): void;
    serializePageNodes(): void;
    sortField: string;
    sortOrder: number;
    multiSortMeta: SortMeta[];
    selection: any;
    updateSelectionKeys(): void;
    onPageChange(event: any): void;
    sort(event: any): void;
    sortSingle(): void;
    sortNodes(nodes: any): void;
    sortMultiple(): void;
    sortMultipleNodes(nodes: any): void;
    multisortField(node1: any, node2: any, multiSortMeta: any, index: any): any;
    getSortMeta(field: string): SortMeta;
    isSorted(field: string): boolean;
    createLazyLoadMetadata(): any;
    isEmpty(): boolean;
    onColumnResizeBegin(event: any): void;
    onColumnResize(event: any): void;
    onColumnResizeEnd(event: any, column: any): void;
    findParentScrollableView(column: any): any;
    resizeColGroup(table: any, resizeColumnIndex: any, newColumnWidth: any, nextColumnWidth: any): void;
    onColumnDragStart(event: any, columnElement: any): void;
    onColumnDragEnter(event: any, dropHeader: any): void;
    onColumnDragLeave(event: any): void;
    onColumnDrop(event: any, dropColumn: any): void;
    handleRowClick(event: any): void;
    handleRowTouchEnd(event: any): void;
    handleRowRightClick(event: any): void;
    toggleNodeWithCheckbox(event: any): void;
    toggleNodesWithCheckbox(event: Event, check: boolean): void;
    propagateSelectionUp(node: TreeNode, select: boolean): void;
    propagateSelectionDown(node: TreeNode, select: boolean): void;
    isSelected(node: any): boolean;
    findIndexInSelection(node: any): number;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
    equals(node1: any, node2: any): boolean;
    reset(): void;
    ngOnDestroy(): void;
}
export declare class TTBody {
    tt: TreeTable;
    columns: any[];
    template: TemplateRef<any>;
    constructor(tt: TreeTable);
}
export declare class TTScrollableView implements AfterViewInit, OnDestroy, AfterViewChecked {
    tt: TreeTable;
    el: ElementRef;
    domHandler: DomHandler;
    zone: NgZone;
    columns: any[];
    frozen: boolean;
    scrollHeaderViewChild: ElementRef;
    scrollHeaderBoxViewChild: ElementRef;
    scrollBodyViewChild: ElementRef;
    scrollTableViewChild: ElementRef;
    scrollFooterViewChild: ElementRef;
    scrollFooterBoxViewChild: ElementRef;
    headerScrollListener: Function;
    bodyScrollListener: Function;
    footerScrollListener: Function;
    frozenSiblingBody: Element;
    _scrollHeight: string;
    subscription: Subscription;
    initialized: boolean;
    constructor(tt: TreeTable, el: ElementRef, domHandler: DomHandler, zone: NgZone);
    scrollHeight: string;
    ngAfterViewChecked(): void;
    ngAfterViewInit(): void;
    bindEvents(): void;
    unbindEvents(): void;
    onHeaderScroll(event: any): void;
    onFooterScroll(event: any): void;
    onBodyScroll(event: any): void;
    setScrollHeight(): void;
    hasVerticalOverflow(): boolean;
    alignScrollBar(): void;
    ngOnDestroy(): void;
}
export declare class TTSortableColumn implements OnInit, OnDestroy {
    tt: TreeTable;
    domHandler: DomHandler;
    field: string;
    ttSortableColumnDisabled: boolean;
    sorted: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, domHandler: DomHandler);
    ngOnInit(): void;
    updateSortState(): void;
    onClick(event: MouseEvent): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTSortIcon implements OnInit, OnDestroy {
    tt: TreeTable;
    field: string;
    ariaLabelDesc: string;
    ariaLabelAsc: string;
    subscription: Subscription;
    sortOrder: number;
    constructor(tt: TreeTable);
    ngOnInit(): void;
    onClick(event: any): void;
    updateSortState(): void;
    ngOnDestroy(): void;
}
export declare class TTResizableColumn implements AfterViewInit, OnDestroy {
    tt: TreeTable;
    el: ElementRef;
    domHandler: DomHandler;
    zone: NgZone;
    ttResizableColumnDisabled: boolean;
    resizer: HTMLSpanElement;
    resizerMouseDownListener: any;
    documentMouseMoveListener: any;
    documentMouseUpListener: any;
    constructor(tt: TreeTable, el: ElementRef, domHandler: DomHandler, zone: NgZone);
    ngAfterViewInit(): void;
    bindDocumentEvents(): void;
    unbindDocumentEvents(): void;
    onMouseDown(event: Event): void;
    onDocumentMouseMove(event: Event): void;
    onDocumentMouseUp(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTReorderableColumn implements AfterViewInit, OnDestroy {
    tt: TreeTable;
    el: ElementRef;
    domHandler: DomHandler;
    zone: NgZone;
    ttReorderableColumnDisabled: boolean;
    dragStartListener: any;
    dragOverListener: any;
    dragEnterListener: any;
    dragLeaveListener: any;
    mouseDownListener: any;
    constructor(tt: TreeTable, el: ElementRef, domHandler: DomHandler, zone: NgZone);
    ngAfterViewInit(): void;
    bindEvents(): void;
    unbindEvents(): void;
    onMouseDown(event: any): void;
    onDragStart(event: any): void;
    onDragOver(event: any): void;
    onDragEnter(event: any): void;
    onDragLeave(event: any): void;
    onDrop(event: any): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTSelectableRow implements OnInit, OnDestroy {
    tt: TreeTable;
    domHandler: DomHandler;
    tableService: TreeTableService;
    rowNode: any;
    ttSelectableRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, domHandler: DomHandler, tableService: TreeTableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    onTouchEnd(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTSelectableRowDblClick implements OnInit, OnDestroy {
    tt: TreeTable;
    domHandler: DomHandler;
    tableService: TreeTableService;
    rowNode: any;
    ttSelectableRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, domHandler: DomHandler, tableService: TreeTableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTContextMenuRow {
    tt: TreeTable;
    tableService: TreeTableService;
    rowNode: any;
    ttContextMenuRowDisabled: boolean;
    selected: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, tableService: TreeTableService);
    onContextMenu(event: Event): void;
    isEnabled(): boolean;
    ngOnDestroy(): void;
}
export declare class TTCheckbox {
    tt: TreeTable;
    domHandler: DomHandler;
    tableService: TreeTableService;
    disabled: boolean;
    rowNode: any;
    boxViewChild: ElementRef;
    checked: boolean;
    subscription: Subscription;
    constructor(tt: TreeTable, domHandler: DomHandler, tableService: TreeTableService);
    ngOnInit(): void;
    onClick(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    ngOnDestroy(): void;
}
export declare class TTHeaderCheckbox {
    tt: TreeTable;
    domHandler: DomHandler;
    tableService: TreeTableService;
    boxViewChild: ElementRef;
    checked: boolean;
    disabled: boolean;
    selectionChangeSubscription: Subscription;
    valueChangeSubscription: Subscription;
    constructor(tt: TreeTable, domHandler: DomHandler, tableService: TreeTableService);
    ngOnInit(): void;
    onClick(event: Event, checked: any): void;
    onFocus(): void;
    onBlur(): void;
    ngOnDestroy(): void;
    updateCheckedState(): boolean;
}
export declare class TTEditableColumn implements AfterViewInit {
    tt: TreeTable;
    el: ElementRef;
    domHandler: DomHandler;
    zone: NgZone;
    data: any;
    field: any;
    ttEditableColumnDisabled: boolean;
    constructor(tt: TreeTable, el: ElementRef, domHandler: DomHandler, zone: NgZone);
    ngAfterViewInit(): void;
    isValid(): boolean;
    onClick(event: MouseEvent): void;
    openCell(): void;
    onKeyDown(event: KeyboardEvent): void;
    findCell(element: any): any;
    moveToPreviousCell(event: KeyboardEvent): void;
    moveToNextCell(event: KeyboardEvent): void;
    findPreviousEditableColumn(cell: Element): any;
    findNextEditableColumn(cell: Element): any;
    isEnabled(): boolean;
}
export declare class TreeTableCellEditor implements AfterContentInit {
    tt: TreeTable;
    editableColumn: TTEditableColumn;
    templates: QueryList<PrimeTemplate>;
    inputTemplate: TemplateRef<any>;
    outputTemplate: TemplateRef<any>;
    constructor(tt: TreeTable, editableColumn: TTEditableColumn);
    ngAfterContentInit(): void;
}
export declare class TreeTableToggler {
    tt: TreeTable;
    rowNode: any;
    constructor(tt: TreeTable);
    onClick(event: Event): void;
}
export declare class TreeTableModule {
}
