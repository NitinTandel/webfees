// Docdefinition for Outstanding Register

var ddOSReg = {
    pageSize: 'A4',
    pageMargins: [ 30, 10, 10, 10 ],

   pageNum: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },

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
                                    [{text: 'Outstanding bills', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
                                    [{text: 'As on <<ASON_DT>>', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
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
                                    [{ text:'Print Date : <<PRINT_DT>>' , colSpan: 2 , border: [false, false, false, true]}, {}, {text   : 'Page No : <<PAGE_NO>>' , border: [false, false, false, true]}],
                                ]
                            }
                        }
                    ],
                    //Section 3
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [160, 80, 30, 55, 50, 50, 50],
//                                headerRows: 2,
                                body: [
                                    [{ text:'Paryt Name' , style: 'tableHeader' , border: [false, false, false, false]}
                                    , {text:'Co. Name' , style: 'tableHeader' , border: [false, false, false, false] }
                                    , {text:'---- Bill ----' ,  style: 'tableHeader', colSpan: 3 , alignment: 'center' , border: [false, false, false, false] } 
                                    , {} 
                                    , {} 
                                    , {text:'Rcpt',  style: 'tableHeader', alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'Bal' , style: 'tableHeader',  alignment: 'right' , border: [false, false, false, false]}],

                                    [ {text:'', border: [false, false, false, true]}
                                    , {text:'' , border: [false, false, false, true]}
                                    , {text:'No', style: 'tableHeader', alignment: 'center' , border: [false, false, false, true]} 
                                    , {text:'Date', style: 'tableHeader', alignment: 'right' , border: [false, false, false, true]} 
                                    , {text:'Amt', style: 'tableHeader', alignment: 'right' , border: [false, false, false, true]} 
                                    , {text:'Amt', style: 'tableHeader', alignment: 'right' , border: [false, false, false, true]} 
                                    , {text:'Amt', style: 'tableHeader', alignment: 'right' , border: [false, false, false, true]}]

                                ]    
                            },
                        }
                    ],

                    //Section 4
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [160, 80, 30, 55, 50, 50, 50],
//                                headerRows: 2,
                                body: [
                                    [ {text:'Group No : <<GROUP_ID>>', style:'GrpName', border: [false, false, false, false],  colSpan: 7}
                                    , {}
                                    , {} 
                                    , {} 
                                    , {} 
                                    , {} 
                                    , {}],

                                    [ {text:'<<PARTY_NAME>>', border: [false, false, false, false]}
                                    , {text:'<<CO_NAME>>' , style : 'subheader', border: [false, false, false, false]}
                                    , {text:'<<BILL>>', alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'<<BILL_DT>>',  alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'<<BILL_AMT>>',  alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'<<RCPT_AMT>>',  alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'<<BAL_AMT>>',  alignment: 'right' , border: [false, false, false, false]}],

                                    [ {text:'', border: [false, false, false, true]}
                                    , {text:'' , border: [false, false, false, true]}
                                    , {text:'Group Total :', alignment: 'right', colSpan : 2 , border: [false, false, false, true]} 
                                    , {} 
                                    , {text:'<<GRP_BILL_TOT>>',  alignment: 'right' , border: [false, true, false, true]} 
                                    , {text:'<<GRP_RCPT_TOT>>',  alignment: 'right' , border: [false, true, false, true]} 
                                    , {text:'<<GRP_BAL_TOT>>',  alignment: 'right' , border: [false, true, false, true]}],

                                ]
                            },
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
    defaultStyle: {
        fontSize: 10
        // alignment: 'justify'
    }   
};

