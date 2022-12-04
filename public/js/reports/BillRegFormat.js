// Docdefinition for Bill Register

var ddbillReg = {
    pageSize: 'A4',
    //pageSize: 'LEGAL',
    pageOrientation: 'landscape',
    pageMargins: [ 20, 10, 5, 30 ], 
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
     content: [
        {
            style: 'tableExample',
            table: {
                widths: [770],
                headerRows: 3,
                body: [
                    //Section 1
                    [
                        {
//                            style: 'dtable',
                            table: {
                                widths: [770],
//                                headerRows: 1,
                                body: [
                                    [{text: '<<CO_NAME>>', style: 'CoName' ,  alignment: 'center', border: [false, false, false, false]}],
                                    [{text: 'Bill Register', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
                                    [{text: 'for the period from <<FROM_DT>> to <<TO_DT>>', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
                                ]
                            }
                        }
                    ],
                    //Section 2
                    [
                        {
//                            style: 'dtable',
                            table: {
                                widths: [355, 265, 150],
                                headerRows: 1,
                                body: [
                                    [{ text:'Print Date : <<PRINT_DT>>' , colSpan: 2 }, {}, {}],
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ],
                    //Section 3
                    [
                        {
//                            style: 'dtable',
                            table: {
//                                25, 55, 150, 40, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50
                                widths: [20, 50, 130, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
//                                headerRows: 2,
                                body: [
                                    [ {text:'Bill No' , border: [false, true, false, false]}
                                    , {text:'Bill Date' , border: [false, true, false, false]}
                                    , {text:'Party Name' ,  border: [false, true, false, false] }
                                    , {text:'File No' ,    alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: '<<COL1HDR1>>' , alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: '<<COL1HDR2>>' , alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: '<<COL1HDR3>>' , alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: '<<COL1HDR4>>' , alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: '<<COL1HDR5>>' , alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: '<<COL1HDR6>>' , alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: '<<COL1HDR7>>' , alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: '<<COL1HDR8>>' , alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: 'Previous' ,    alignment: 'center' , border: [false, true, false, false] } 
                                    , {text: 'Total' ,   alignment: 'right' , border: [false, true, false, false]}],

                                    [ {text:' ', border: [false, false, false, true]}
                                    , {text:' ' , border: [false, false, false, true]}
                                    , {text:'',  alignment: 'center' , border: [false, false, false, true]} 
                                    , {text:'',  alignment: 'right' , border: [false, false, false, true]} 
                                    , {text: '<COL2HDR1>>' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: '<COL2HDR2>>' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: '<COL2HDR3>>' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: '<COL2HDR4>>' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: '<COL2HDR5>>' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: '<COL2HDR6>>' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: '<COL2HDR7>>' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: '<COL2HDR8>>' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: 'Balance' , alignment: 'center' , border: [false, false, false, true] } 
                                    , {text: ' ', border: [false, false, false, true]}],
                                ]    
                            },
                        }
                    ],

                    //Section 4
                    [
                        {
//                            style: 'dtable',
                            table: {
                                widths: [20, 50, 130, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
                                body: [
                                    [ {text:'<<BILLNO>>' , border: [false, false, false, false]}
                                    , {text:'<<BILL_DT>>' ,  border: [false, false, false, false] }
                                    , {text:'<<PARTY_NAME>>',  border: [false, false, false, false] } 
                                    , {text:'<<AC_CODE>>' ,   border: [false, false, false, false] } 
                                    , {text:'<<COLAMT1>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<COLAMT2>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<COLAMT3>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<COLAMT4>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<COLAMT5>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<COLAMT6>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<COLAMT7>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<COLAMT8>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<OST>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<COLTOT>>', alignment: 'right' , border: [false, false, false, false]} ,  ],

                                    [ {text:' ' , border: [false, false, false, false]  }
                                    , {text:'<<TRCD_DATA>>', colSpan : 3 ,  border: [false, false, false, false] }
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } 
                                    , { } ,  ],
                                ]
                            },
                        }
                    ],

                    //Section 5
                    [
                        {
//                            style: 'dtable',
                            table: {
                                widths: [20, 50, 130, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
                                body: [
                                    [ {text:' ' , border: [false, true, false, true]}
                                    , {text:' ' , border: [false, true, false, true] }
                                    , {text:'Grand Total : ' , border: [false, true, false, true] } 
                                    , {text:' ' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:' ' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:'<<GTOT>>', alignment: 'right' , border: [false, true, false, true]} ,  ],
                                ]
                            },
                        }
                    ],

                    //Section 6
                    [
                         {text:'Developed by A. V. Solutions',  style: 'copyrights'  , border: [false, true, false, false] } 
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
    defaultStyle: {
        fontSize: 8
        // alignment: 'justify'
    }   
};

