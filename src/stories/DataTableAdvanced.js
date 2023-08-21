
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './DataTableAdvanced.css';

export const DataTableAdvanced = ({ allColumn }) => {
    const [data, setData] = useState(allColumn);
    const [products, setProducts] = useState(data);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const toastTopRight = useRef(null);

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

    return (
        <div>
            <Toast ref={toastTopRight} position="top-left" />
            <div className="card">
                <DataTable value={products} header={header} selectionMode={'checkbox'} selection={selectedProducts} onSelectionChange={(e) => {setSelectedProducts(e.value)}} responsiveLayout="scroll" className="DataTable-responsive">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="code" header="Code" sortable></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="category" header="Category" sortable></Column>
                    <Column field="quantity" header="Quantity" sortable></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column>
                </DataTable>
            </div>
        </div>
    );
}          