// Docdefinition for Bill Register

var ddLedger = {
    pageSize: 'A4',
    pageMargins: [ 30, 10, 10, 30 ],
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
                widths: [515],
                headerRows: 2,
                body: [
                    //Section 1
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [515],
                                headerRows: 3,
                                body: [
                                    [{text: '<<CO_NAME>>', style: 'CoName' ,  alignment: 'center', border: [false, false, false, false]}],
                                    [{text: 'Ledgers', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
                                    [{text: 'for the period from <<FROM_DT>> to <<TO_DT>>', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
                                ]
                            }
                        }
                    ],
                    //Section 2
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [355, 10, 140],
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
                            style: 'dtable',
                            table: {
                                widths: [55, 50, 250, 50, 50, 50 ],
//                                headerRows: 2,
                                body: [

                                    [ {text:'<<AC_CODE>>' , border: [false, false, false, false]}
                                    , {text:'<<AC_NAME>>', colSpan: 5 , border: [false, false, false, false]}
                                    , {}
                                    , {} 
                                    , {} 
                                    , {}],

                                    [ {text:'Date' , border: [false, true, false, true]}
                                    , {text:'No' , border: [false, true, false, true]}
                                    , {text:'Particulars' ,  border: [false, true, false, true] }
                                    , {text:'Bill Amount' ,  alignment: 'center' , border: [false, true, false, true] } 
                                    , {text:'Rcpt Amount' , alignment: 'center' , border: [false, true, false, true] } 
                                    , {text:'Balance' , alignment: 'center' , border: [false, true, false, true] } ] ,

                                    [ {text:'<<TRAN_DT>>' , border: [false, false, false, false]}
                                    , {text:'<<NO>>' , border: [false, false, false, false]}
                                    , {text:'<<PARTICULARS>>' ,  border: [false, false, false, false] }
                                    , {text:'<<BILL_AMT>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<RCPT_AMT>>' , alignment: 'right' , border: [false, false, false, false] } 
                                    , {text:'<<BAL_AMT>>' , alignment: 'right' , border: [false, false, false, false] } ] ,

                                    [ {text:' ' , border: [false, true, false, true]}
                                    , {text:' ' , border: [false, true, false, true]}
                                    , {text:'Net for the Period' ,  border: [false, true, false, true] }
                                    , {text:'<<BILLAMT_TOT>>' ,  alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:'<<RCPTAMT_TOT>>' , alignment: 'right' , border: [false, true, false, true] } 
                                    , {text:'<<BALAMT_TOT>>' , alignment: 'right' , border: [false, true, false, true] } ] ,

                                    [ {text:' ' ,  border: [false, false, false, false]}
                                    , {text:' ' ,  border: [false, false, false, false]}
                                    , {text:' ' ,  border: [false, false, false, false]}
                                    , {text:' ' ,  border: [false, false, false, false]} 
                                    , {text:' ' ,  border: [false, false, false, false]} 
                                    , {text:' ' ,  border: [false, false, false, false]}],

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
        fontSize: 10
        // alignment: 'justify'
    }   
};

