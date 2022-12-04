// Docdefinition for Outstanding Register

var ddrcptReg = {
    pageSize: 'A4',
    pageMargins: [ 30, 10, 10, 10 ],
    footer: function(currentPage, pageCount) { 
        return {
            margin:10,
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
                text: '© A. V. Solutions     Page : ' + currentPage.toString() + ' of ' + pageCount,
                }
                ],
                alignment: 'center'
            }
            ]
        };
    },
    content :  [ 
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
                                    [{text: '<<CO_NAME>>', style: 'CoName' ,  alignment: 'center', border: [false, false, false, false]}],
                                    [{text: 'Receipt Register', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
                                    [{text: 'For the period from <<FROM_DT>> to <<TO_DT>>', style: 'header',  alignment: 'center',  border: [false, false, false, false]}],
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
                                    [{text:'Print Date : <<PRINT_DT>>' , colSpan: 2 , border: [false, false, false, true]}, {}, {text : 'Page No : ' + this.footer  , border: [false, false, false, true]}],
                                ]
                            }
                        }
                    ],
                    //Section 3
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [160, 50, 50, 55, 50, 50, 50],
//                                headerRows: 2,
                                body: [
                                    [ {text:'Paryt Name' , style: 'tableHeader' , alignment: 'center' , border: [false, false, false, true]}
                                    , {text:'B. No' , style: 'tableHeader', alignment: 'center' , border: [false, false, false, true] }
                                    , {text:'B. Amt' ,  style: 'tableHeader', alignment: 'center',  border: [false, false, false, true] } 
                                    , {text:'R. Date' , style: 'tableHeader', alignment: 'center' , border: [false, false, false, true]} 
                                    , {text:'Cash' , style: 'tableHeader', alignment: 'center' , border: [false, false, false, true]} 
                                    , {text:'Cheque',  style: 'tableHeader', alignment: 'center' , border: [false, false, false, true]} 
                                    , {text:'R. Amt' , style: 'tableHeader',  alignment: 'center' , border: [false, false, false, true]}],
                                ]    
                            },
                        }
                    ],

                    //Section 4
                    [
                        {
                            style: 'dtable',
                            table: {
                                widths: [160, 50, 50, 55, 50, 50, 50],
//                                headerRows: 2,
                                body: [

                                    [ {text:'<<PARTY_NAME>>', border: [false, false, false, false]}
                                    , {text:'<<BILL>>' , alignment: 'center' , border: [false, false, false, false]}
                                    , {text:'<<BILL_AMT>>', alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'<<RCPT_DT>>',  alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'<<CASH_AMT>>',  alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'<<CHQ_AMT>>',  alignment: 'right' , border: [false, false, false, false]} 
                                    , {text:'<<RCPT_AMT>>',  alignment: 'right' , border: [false, false, false, false]}],

                                    [ {text:'Total', border: [false, true, false, true]}
                                    , {text:'' , border: [false, true, false, true]}
                                    , {text:'<<BILL_TOT>>', alignment: 'right', border: [false, true, false, true]} 
                                    , {text:' ', alignment: 'right', border: [false, true, false, true]} 
                                    , {text:'<<CASH_TOT>>',  alignment: 'right' , border: [false, true, false, true]} 
                                    , {text:'<<CHQ_TOT>>',  alignment: 'right' , border: [false, true, false, true]} 
                                    , {text:'<<RCPT_TOT>>',  alignment: 'right' , border: [false, true, false, true]}],

                                ]
                            },
                        }
                    ],

                    //Section 5
                    [
                         {text:'Developed by A. V. Solutions',  style: 'copyrights'  , border: [false, false, false, false] }   
                    ],
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

