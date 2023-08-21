import { within, userEvent } from '@storybook/testing-library';

import { DataTableAdvanced } from './DataTableAdvanced';

export default {
  title: 'Example/DataTableAdvanced',
  component: DataTableAdvanced,
  argTypes: {
    onClick: { action: 'clicked' },
    dataKey: {
        required: true,
        description: "Unique Identifier Column Key, example id",
        table: { type: { summary: 'string' }, }
    },
    columnData: {
        required: true,
        description: "JSON data for table rows",
        table: { type: { summary: 'JSON' }, },
        control: { type: 'JSON' }
    },
    allColumn: {
        required: false,
        description: "JSON data for showing all columns",
        table: { type: { summary: 'JSON' }, },
        control: { type: 'JSON' }
    },
    defaultShowColumn: {
        required: false,
        description: "JSON data for showing fixed columns on first render",
        table: { type: { summary: 'JSON' }, },
        control: { type: 'JSON' }
    },
    addOnSelectedColumn: {
        required: false,
        description: "JSON data to AddOn columns in table data as per required from Dropdown menu",
        table: { type: { summary: 'JSON' }, },
        control: { type: 'JSON' }
    },
    filters: {
        required: false,
        description: "Objects for filtering columns wise data",
        table: { type: { summary: 'JSON' }, },
        control: { type: 'JSON' }
    },
    size: {
        required: true,
        description: "DataTable size (normal, medium, large) ",
        table: { type: { summary: 'string' }, },
        control: { type: 'string' }
    },
    sortFilterAtHeader: {
        required: true,
        description: "Enable filtering and sorting on the top of the header",
        table: { type: { summary: 'Boolean' }, },
        control: { type: 'Boolean' }
    },
    filterDisplay: {
        required: false,
        description: "filter type menu or row",
        table: { type: { summary: 'string' }, },
        control: { type: 'string' }
    },
    isShowPopUp: {
        required: false,
        description: "show popup model on any column",
        table: { type: { summary: 'Boolean' }, },
        control: { type: 'Boolean' }
    },
    setIsShowPopUp: {
        required: false,
        description: "setState for isShowPopup",
        table: { type: { summary: 'Fuction' }, },
        control: { type: 'Function' }
    },
    popUpMsg: {
        required: false,
        description: "State for pop-up model message template",
        table: { type: { summary: 'Boolean' }, },
        control: { type: 'Boolean' }
    },
    setPopUpMsg: {
        required: false,
        description: "setState for pop-up model message template",
        table: { type: { summary: 'Boolean' }, },
        control: { type: 'Boolean' }
    },
    showRowCheckBox: {
        required: false,
        description: "To show row checkbox",
        table: { type: { summary: 'Boolean' }, },
        control: { type: 'Boolean' }
    },
    globalFilter: {
        required: false,
        description: "To show global filter",
        table: { type: { summary: 'Boolean' }, },
        control: { type: 'Boolean' }
    },
    paginator: {
        required: true,
        description: "To show pagination for DataTable",
        table: { type: { summary: 'Boolean' }, },
        control: { type: 'Boolean' }
    },
    addOnFields: {
        required: true,
        description: "This will return a HTML tag, pass any html tag ",
        table: { type: { summary: 'HTML tag' }, },
        control: { type: 'HTML tag' }
    },
    noData: {
        required: true,
        description: "When No data for coloumns  ",
        table: { type: { summary: 'Boolean' }, },
        control: { type: 'Boolean' }
    },
    menuFilters: {
        required: {},
        description: "Object for menu filter search ",
        table: { type: { summary: 'Object' }, },
        control: { type: 'Object' }
    },
    filterWithContainsOnly: {
        required: false,
        description: 'For hide filter dropdown Match All and Add Rule Button',
        control: { type: 'Boolean' }
    },
    globalSearchCustomClassName: {
        required: false,
        description: 'For the custom style of global search text input',
        control: { type: 'string' }
    },

},
};

export const AdvancedTemplate =()=> {

const allColumn = [
    {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5,"isChecked": false},
    {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4,"isChecked": false},
    {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3,"isChecked": false},
    {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5,"isChecked": false},
    {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4,"isChecked": false},
    {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4,"isChecked": false},
    {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3,"isChecked": false},
    {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5,"isChecked": false},
    {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4,"isChecked": false},
    {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3,"isChecked": false}
];
  return <DataTableAdvanced allColumn={allColumn} />
};

