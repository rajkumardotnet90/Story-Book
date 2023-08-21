import React, { useState, useEffect, useRef } from 'react';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import './DataTableBasic.css';
import { cloneDeep } from 'lodash';

export const DataTableBasic = ({ allColumn, columns }) => {
    const [data, setData] = useState(allColumn);
    const [columnData, setColumnData] = useState(columns);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const toastTopRight = useRef(null);
    const [state, setState] = React.useState({});
    const isIPadView = () => window.innerWidth >= 768;
    const MOBILE_TABLE_WIDTH = 832;

    useEffect(() => {
        setProducts(data);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (selectedProducts.length) showAlertMessage(toastTopRight, 'info')
    }, [selectedProducts]);


    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
        </div>
    );

    const showAlertMessage = (ref, severity) => {
        let selectedProduct = selectedProducts.length !== products.length ? selectedProducts.map(item => item.name).join(', ') : 'All Products Selected';
        const label = selectedProduct;
        ref.current.show({ severity: severity, summary: 'Selected Products', detail: label, life: 1000 });
    };

    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const sortMessages = (messageHistoryData, column) => {
        let sortedArray = sortMessageHistory(messageHistoryData, column, state);
        setProducts(sortedArray);
    };

    const sortMessageHistory = (messageHistoryData, column, state) => {
        let messageHistory = cloneDeep(messageHistoryData);
        console.log("messageHistory", messageHistory);
        let sortedMessage = [];
        if (column === 'Product_Name') {
            sortedMessage = state.ascending ? messageHistory && messageHistory.length > 0 && messageHistory.sort((a, b) => { return a.name.localeCompare(b.name) }) : messageHistory && messageHistory.length > 0 && messageHistory.sort((a, b) => { return b.name.localeCompare(a.name) });
        } else if (column === 'quantity') {
            sortedMessage = state.ascending ? messageHistory && messageHistory.length > 0 && messageHistory.sort((a, b) => { return a.quantity - b.quantity }) : messageHistory && messageHistory.length > 0 && messageHistory.sort((a, b) => { return b.quantity - a.quantity });
        }
        return sortedMessage;
    };

    const handleOnClick = (sortable, column, colIndex) => {
        if (sortable) {
            setState({
                ...state,
                activeHeader: column.accessor,
                activeColIndex: colIndex,
                ascending: !state.ascending,
            });
            sortMessages(data, column.accessor);
        } else if (column.accessor === 'checkbox') {
            console.log("handleOnClick", column);
            column.isChecked = !column.isChecked;
            let colData = cloneDeep(columns);
            colData.map(item => {if (column.accessor === 'checkbox') item.isChecked = !item.isChecked});
            setColumnData(colData);
            console.log("columnData", columnData)
            if (column.isChecked) {
                let selectedProducts = cloneDeep(data);
                selectedProducts.map(item => item.checked =!item.checked);
                setSelectedProducts(selectedProducts);
            } else {
                setSelectedProducts([]);
            }
            console.log("selectedProducts", selectedProducts);
        }
    };

    const onProductSelect = (value, checked) => {
        console.log("onProductSelect", value, checked);
        // setProducts({...products, isChecked: products.name === value.name ? checked : products.isChecked })
        let selectedProduct = products.forEach(prod => { if (prod.name === value.name) prod.isChecked = checked });
        setProducts(selectedProduct);
        // if (checked) {
        //     setSelectedProducts([...selectedProducts, value]);
        // } else {
        //     let selectedProduct = selectedProducts.filter(item => item.name!== value.name);
        //     setSelectedProducts(selectedProduct);
        // }
    };
    console.log("products", products);
    const TableHeader = ({ handleOnClick, column, sortable, colIndex, state }) => {
        return (
            <div
                className={`w-${!isIPadView() ? column.iPhoneWidth : column.width} h-full flex flex-start items-center text-sm font-bold`}
                onClick={() => handleOnClick(sortable, column, colIndex)}
            >
                <div className='w-full h-full flex break-word items-center' style={column.accessor === 'checkbox' ? {justifyContent: 'center'} : null}>
                    {column.Header ? <span className="text-sm">{column.Header}</span> : <input type='checkbox' checked={column.isChecked} />}
                    {sortable && ((state.ascending && state.activeHeader === column.accessor) || state.activeHeader !== column.accessor) && <BsArrowDown size={16} />}
                    {sortable && state.activeHeader === column.accessor && !state.ascending && <BsArrowUp size={16} />}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toastTopRight} position="top-left" />
            <section>
                <section className="w-full">
                    <div className="w-full mb-2 rounded-lg">
                        <div className="overflow-y-scroll" style={{ width: !isIPadView() ? MOBILE_TABLE_WIDTH : '' }}>
                            <header className="h-12 flex" style={{ 'background-color': '#EFEFEF', color: '#707070' }}>
                                {columnData && columnData.length > 0 && columnData.map((column, colIndex) => {
                                    const sortable = ['Product_Name', 'quantity'].includes(column.accessor);
                                    return (
                                        !column.hide && (
                                            <TableHeader handleOnClick={handleOnClick} column={column} sortable={sortable} colIndex={colIndex} state={state} />
                                        )
                                    );
                                })}
                            </header>
                        </div>
                        <div className="shadow-md">
                            <aside className="hcp-response_body">
                                {products && products.length > 0 && (
                                    <div>
                                        <div className="h-96">
                                                {products.map((section) => {
                                                    return (
                                                        <div>
                                                            <div className="flex w-full">
                                                                <div className="w-full flex text-left items-center font-normal h-8">
                                                                    <div className="w-1/12 flex items-center justify-center"><input type='checkbox' onChange={(e) => onProductSelect(section, e.target.checked)} /></div>
                                                                    <div className="w-2/12 flex">{section.code}</div>
                                                                    <div className="w-3/12 flex">{section.name}</div>
                                                                    <div className="w-2/12 flex">{section.category}</div>
                                                                    <div className="w-2/12 flex">{section.quantity}</div>
                                                                    <div className="w-2/12 flex">{ratingBodyTemplate(section)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                )}
                                {products.length === 0 && (
                                    <div className="text-center p-4">MI_ROW:No_Data_To_Display</div>
                                )}
                            </aside>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}          