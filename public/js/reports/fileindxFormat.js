// Docdefinition for File Index Printing
// Updated on : 21/8/2021

var ddfileIndx = {
    pageSize: 'A4',
    pageMargins: [ 30, 10, 10, 40 ],
//    footer: footer_definition,
    /*
    footer: function(currentPage, pageCount) { 
        return {
            columns: [
            {
                fontSize: 9,
                text:[
                {
                text: '--------------------------------------------------------------------------' +
                '\n',
                margin: [0, 20]
                },
                {
                text: '© A. V. Solutions    -- Page ' + currentPage.toString() + ' of ' + pageCount,
                }
                ],
                alignment: 'center'
            }
            ]
        };
    },    
*/
    content: [
        {
            style: 'tableExample',
            table: {
                widths: [540],
                headerRows: 3,
                body: [
                    //Section 1
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [500],
                                headerRows: 1,
                                body: [
                                    [{text: 'H. B. Gala & Co. & Associated Firms', style: 'CoName' ,  alignment: 'center', border: [false, false, false, false]}],
                                    [{text: 'File Index - <<RPTOPTION>>', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
                                ]
                            }
                        }
                    ],
                    //Section 2
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [355, 10, 150],
                                headerRows: 1,
                                body: [
                                    [{ text:'Print Date : <<PRINT_DT>>' , colSpan: 2 , border: [false, false, false, false]}, {}, {text   : 'Page No : <<PAGE_NO>>' , border: [false, false, false, false]}],
                                ]
                            }
                        }
                    ],

                    //Section 3
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [70, 170, 10, 70, 170],
                                body: [
                                    [ {text:'File No' , border: [false, true, false, true]}
                                    , {text:'Name' , border: [false, true, false, true]}
                                    , {text:' ', border: [false, true, false, true]}
                                    , {text:'File No' ,  border: [false, true, false, true] } 
                                    , {text:'Name' ,  border: [false, true, false, true] } 
                                    ] ,
                                ]
                            }
                        }
                    ],

                    //Section 4
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [70, 170, 10, 70, 170],
                                heights: 30,
                                body: [                                   
                                   [ {text:'<<AC_CODE1>>' , border: [false, false, false, false]}
                                    , {text:'<<AC_NAME1>>', border: [false, false, false, false]}
                                    , {text:' ', border: [false, false, false, false]}
                                    , {text:'<<AC_CODE2>>' , border: [false, false, false, false]} 
                                    , {text:'<<AC_NAME2>>' , border: [false, false, false, false]} 
                                    ],
                                ]
                            }                    
                        }
                    ],
                    
                    //Section 5
                    [
                         {text:'Developed by A. V. Solutions',  style: 'copyrights'  , border: [false, false, false, false] }   
                    ]
                ]
            },
            layout: 'noBorders'
        },
    ],
    styles: {
        header: {
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        copyrights: {
            fontSize: 10,
            bold: false,
            italics: true,
            margin: [0, 0, 0, 10]
        },
        subheader: {
            fontSize: 8,
            bold: false,
        },
        tableExample: {
            margin: [0, 5, 0, 15]
        },
        tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black'
        },
        GrpName: {
            bold: true,
            fontSize: 10,
            decoration: 'underline'
        },

        CoName: {
            bold: true,
            fontSize: 18,
            color: 'black'
        }
    },
    footer: (currentPage, pageCount, pageSize) => {
        return [{
            margin: [31, 0, 31],
            layout: {
                hLineColor: (i) => (i === 0) ? 'lightgray' : '',
                vLineWidth: (i) => 0,
                hLineWidth: (i) => (i === 0) ? 1 : 0
            },
            table: {
                widths: ['*', 160, 160],
                body: [
                    [
                        {text: '(c) 2019, ', fontSize: 8},
                        {text: '#', alignment: 'center'},
                        {text: `${currentPage}/${pageCount}`}
                    ]
                ]
            }
        }];
    },
    
    
    defaultStyle: {
        fontSize: 10
        // alignment: 'justify'
    }   
};

