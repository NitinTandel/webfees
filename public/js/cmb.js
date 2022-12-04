// Docdefinition for single bill

var ddSingleBill = {
  	pageSize: 'LEGAL',
//    pageSize: {width: 590, height: 486 }, //Half of legal paper

  	pageMargins: [ 30, 10, 5, 5 ],
	content: [
		{
			style: 'tableExample',
			table: {
				widths: [540],
				body: [
					//Section 1
					[
						{
							style: 'dtable',
							table: {
								widths: [355, 10, 150],
								headerRows: 1,
								body: [
									[{text: '<<CO_NAME>>', style: 'CoName', colSpan: 2, border: [false, false, false, false]}, {}, {text:' ' , border: [false, false, false, false] }],
                                    [{text: '<<CO_DESCR>>', colSpan: 2, border: [false, false, false, false]}, {}, {text:'Tel : <<CO_TEL>>', border: [false, false, false, false]}],
				                    [{text: '<<CO_ADD>>',  colSpan: 2, border: [false, false, false, true]}, {}, {text: '<<CO_EMAIL>>', border: [false, false, false, true]}],
								]
							}
						}
					],
					//Section 2
					//Section 3
					[
                		{
                			style: 'dtable',
                			table: {
                				widths: [355, 10, 150],
                				headerRows: 1,
                				body: [
                                    [{ text:'To,' , colSpan: 3 , border: [false, false, false, false]}, {}, {}],
                                    [{ text:'<<PARTY_NM>>', colSpan: 2 , border: [false, false, false, false]}, {}, {text   : 'Bill No    : <<BILL_NO>>' , border: [false, false, false, false]}],
                                    [{ text:'<<PARTY_ADD1>>', colSpan: 3 , border: [false, false, false, false]}, {}, {}],
                                    [{ text:'<<PARTY_ADD2>>', colSpan: 2 , border: [false, false, false, false]}, {}, {text : 'Bill Date : <<BILL_DATE>>' , border: [false, false, false, false]}],
                                    [{ text:'<<PARTY_ADD3>>', colSpan: 3 , border: [false, false, false, false]}, {}, {}],
                				]
                			}
                		}
					],
					//Section 4
					[
                		{
                			style: 'dtable',
                			table: {
                				widths: [20, 355, 50, 80],
                				headerRows: 1,
                				body: [
                					[{ text:'No', style: 'tableHeader' }, {text:'Particulars', style: 'tableHeader' , colSpan:2 }, {text:'' }, {text:'Amount', style: 'tableHeader', alignment: 'right' }],
                					[{ text:'<<LINE>>' , alignment: 'right'  }, {text : '<<BILL_TRAN>>' , colSpan:2 } , {} ,{text:'<<TRAN_AMT>>', alignment: 'right' }],
                					['', {text :'' , colSpan:2 } , {} ,' '],
                                    ['', {text :'' , colSpan:2 } , {} ,' '],
                                    ['', {text :'' , colSpan:2 } , {} ,' '],
                                    ['', {text :'' , colSpan:2 } , {} ,' '],
                                    ['', {text :'' , colSpan:2 } , {} ,' '],
                                    ['', {text :'' , colSpan:2 } , {} ,' '],
                                    ['', {text :'' , colSpan:2 } , {} ,' '],
                                    ['', {text :'' , colSpan:2 } , {} ,' '],
                					[{text:"Please pay by A/c. Payee's Cheque Only.", colSpan:2}, {},  {text :'Total :',  alignment: 'right'}, {text:'<<TOT_AMT>>', alignment: 'right', style:'tableHeader'}],
                				]
                			},
                            layout:'billtblLayout'
                        }
					],
					//Section 5
					[
                		{
                			style: 'dtable',
                			table: {
                				widths: [250, 10, 255],
                				body: [
                                    [{text: '<<AMTINWORDS>>', colSpan: 3, border: [false, false, false, false]}, '', '' ],
                                    [{text:'E.& O. E.' ,  border: [false, false, false, false] }, {text:' ' , border: [false, false, false, false]}, {text:'For <<CO_NAME>>,', style: 'tableHeader', alignment: 'right' , border: [false, false, false, false]}],
                                    [{text:'Bank : <<BANK_NAME>>' , colSpan : 2 , border: [false, false, false, false]}, {}, {text: ' ', border: [false, false, false, false]}],
                                    [{text:'IFSC : <<IFSC>> / Account No : <<BANK_ACC>> ', colSpan : 2, border: [false, false, false, true]}, {}, {text:'.', style: 'tableHeader', alignment: 'right' , border: [false, false, false, true] }]
                				]
                			}
                		}
					],
	                [
                         {text:'Developed by A. V. Solutions',  style: 'copyrights'  }   
	                ]
				]
			},
			layout: 'noBorders'
		},
	],
	styles: {
		header: {
			fontSize: 18,
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
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 12,
			color: 'black'
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

// Docdefinition for Bill Register

var ddbillReg = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [ 30, 10, 5, 30 ],
    pageNum: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
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
                            style: 'dtable',
                            table: {
                                widths: [770],
                                headerRows: 1,
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
                            style: 'dtable',
                            table: {
                                widths: [355, 265, 150],
                                headerRows: 1,
                                body: [
                                    [{ text:'Print Date : <<PRINT_DT>>' , colSpan: 2 }, {}, {text   : 'Page No : <<PAGE_NO>>' }],
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
                                widths: [25, 55, 150, 40, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
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
                            style: 'dtable',
                            table: {
                                widths: [25, 55, 150, 40, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
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
                            style: 'dtable',
                            table: {
                                widths: [25, 55, 150, 40, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
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
        fontSize: 10
        // alignment: 'justify'
    }   
};

// Docdefinition for Bill Register

var ddLedger = {
    pageSize: 'A4',
    pageMargins: [ 30, 10, 10, 30 ],
    pageNum: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
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

// Main file for Webpack

function XMLstring(str) {
	var rtnstr =  str.replace(/&/g, "&amp;" ) ;
	rtnstr =  rtnstr.replace(/'/g, "&apos;" ) ;
	rtnstr =  rtnstr.replace(/"/g, "&quot;" ) ;
    return rtnstr;
}



/*msgType 0 = Success, 1 = Error, 2 = Warning ,  3 = Information */
function ShowSnackbar(msg, msgType) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  var bgColor = ((msgType == 1) ?  "alert alert-danger" : "alert alert-success") ;

  // Add the "show" class to DIV
  x.className = "show";
  x.innerHTML = msg ;

//  x.background-color = bgColor ;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


//Common functions

function dateinDDMMYYYY(mDt) {
	var dd = mDt.getDate();
	var mm = mDt.getMonth() + 1; //January is 0!
	var yyyy = mDt.getFullYear();

	if (dd < 10) {
  		dd = '0' + dd;
	} 
	if (mm < 10) {
  		mm = '0' + mm;
	} 
	var rtnstrDt = dd + '/' + mm + '/' + yyyy;	
    return rtnstrDt;
}


function dateinYYYYMMDD(mDt) {
	var dd = mDt.getDate();
	var mm = mDt.getMonth() + 1; //January is 0!
	var yyyy = mDt.getFullYear();

	if (dd < 10) {
  		dd = '0' + dd;
	} 
	if (mm < 10) {
  		mm = '0' + mm;
	} 
	var rtnstrDt = yyyy + '-' + mm + '-' + dd;	
    return rtnstrDt;
}


function appToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	} 
	if (mm < 10) {
	  mm = '0' + mm;
	} 
	var rtnVal = dd + '/' + mm + '/' + yyyy;

    return rtnVal;
}

function strDateDDMMYYYY(strDtYYYYMMDDD) {
	var rtnDt =  strDtYYYYMMDDD.substring(8,10) + "/" + strDtYYYYMMDDD.substring(5,7) + "/" + strDtYYYYMMDDD.substring(0,4);
	return rtnDt ;
}

function convertInWords (num) {
	var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
	var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'And ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]])  : '';
    return str;
}


function convertValidJSON(strVal) {
//	var rtnVal = strVal.replace(/\\["\\\/bfnrtu]/g, '@').
//		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
//		replace(/(?:^|:|,)(?:\s*\[)+/g, '') ;
	var rtnVal = strVal.replace(/'/g, "");
	var rtnVal = rtnVal.replace(/"/g, "") ;
	var rtnVal = rtnVal.replace(/\\/g, "-") ;

	return rtnVal ;	
}

function numberWithCommas(x) {
//    x = ((typeof x === "undefined") ? 0 : x);
    x = ( x === null ? 0 : x);

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}





var FeesApp = angular.module('FeesApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});


FeesApp.controller('UserListCntrl', ['$scope', '$http',  '$location',  function($scope, $http , $location ) {
	$scope.pagetitle = "Manage Users" 
	$scope.sortColumn = 'USERID';
	$scope.sortReverse = false;
//	$scope.searchQury = '{USERID: search.USERID, USER_NAME: search.USER_NAME}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values	
	$scope.confirmPassword = "" ;
	$scope.edituser = {} ;

	$scope.selectedComp = {} ;


	$http.get('/company/listall').then(function(response) { 
	    $scope.companylist = response.data;
	});

	$http.get('/company/yearslist').then(function(response) { 
	    $scope.yearlist = response.data;
	});


	$scope.UpdtcPass = function(val) {
		$scope.confirmPassword = val ;		
	};

	var refresh = function() {
	  $http.get('/users/listall').then(function(response) { 
	    $scope.userlist = response.data;
	    $scope.userdata = "";
	    $scope.confirmPassword = "" ;
		//$scope.cpwd ="";	    		
	  });
	};

	refresh();


//=============================================
//Add new user
//============================================
    $scope.addUser = function addUser() {
    	$scope.rtnMessage="" ;
      	$('#AddNewUser').modal();
    }

	$scope.registerNewUser = function(user) {
	  $http.post('/users/register', $scope.user).then(function(response) {
	  	$scope.rtnMessage=response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    //console.log(response);
	    refresh();
	  });
	};


//=============================================
//Edit the user
//============================================
    $scope.editUser = function editUser(row) {
//    	$scope.edituser = row ;
    	var selectedUser = row.USERID ;	
	  	$http.get('/users/details/' +  selectedUser).then(function(response) { 
	    	$scope.edituser = response.data;
	  	});

		$scope.rtnMessage="" ;
	    var index = $scope.userlist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditUser').modal();
	    }
    }

	$scope.modifyUpdateUser = function(editeduser) {
	
	  $http.post('/users/updateUser', editeduser).then(function(response) {
	  	$scope.rtnMessage=response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
//	    console.log(response);
	    refresh();
	  });
	};


//=============================================
//Change Password for user
//============================================
    $scope.changePwd = function changePwd(row) {
    	$scope.cpwd = row ;
	    var index = $scope.userlist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#ChangePass').modal();
	    }
    }

	$scope.updateUserPwd = function(editeduser) {
	  $http.post('/users/changepass', editeduser).then(function(response) {
	    $scope.rtnMessage=response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;

	    //console.log(response.data.message);
	    //refresh();
	  });
	};


//=============================================
//Delete the user
//============================================
    $scope.removeUser = function removeUser(row) {
	$scope.deleteUSERID = row.USERID ;
    var index = $scope.userlist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteUser').modal();
        }
    }

    $scope.deleteUser = function deleteUser(userid, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/users/delete/' + userid  , []).then(function(response) {
		    $scope.rtnMessage=response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.userlist.splice(currentIndex, 1);
		    refresh();
		  });
        }
    }


//=============================================
//Change the company of the  current user user
//============================================

    $scope.changeCurrentCo = function changeCurrentCo(comp, action) {
    	if(action =="change") {
			$http.post('/users/updateCurrentCo' , [comp]).then(function(response) {
			    $scope.rtnMessage=response.data.message ;
		  		$scope.isRtnMsgErr = response.data.error ;
			});    		
    	}

		var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
		console.log(approotpath);
		window.open(approotpath,"_self")		
    }


//=============================================
//Change the company of the  current user user
//============================================

    $scope.changeCurrentYear = function changeCurrentYear(yr, action) {
    	if(action =="change") {
			$http.post('/users/updateCurrentYr' , [yr]).then(function(response) {
			    $scope.rtnMessage=response.data.message ;
		  		$scope.isRtnMsgErr = response.data.error ;
			});    		
    	}

		var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
		console.log(approotpath);
		window.open(approotpath,"_self");
    }



//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}

}]); //End of controller : UserListCntrl



FeesApp.directive("compareTo", function() {
      return {
        require: "ngModel",
        $scope: {
          Password2: "=compareTo"
        },
        link: function($scope, element, attributes, modelVal) {
          modelVal.$validators.compareTo = function(val) {
            return val == $scope.confirmPassword;
          };

          $scope.$watch("Password2", function() {
            modelVal.$validate();
          });
        }
      };
});


FeesApp.directive("feesappPageHeader", function() {
	return {
		template : '<div class="page-header"><h3>[[pagetitle]]</h3></div>'
	}
});




//=============================================================================================
// Factories
//=============================================================================================

/*
FeesApp.factory('myFactory', function () {
  var _artist = '';
  var service = {}

  service.getArtist = function () {
    return _artist
  }

  return service;
})
*/

/*
FeesApp.factory('UserService', function() {
	var UserSrvObj = {}; 
	var localcurrentCompanyId = "Hello";
	var localcurrentCompanyName = "";

	UserSrvObj.getBillData = function(){
		return localcurrentCompanyId ;
	};	

	UserSrvObj.getCurrentCoName = function(){
		return localcurrentCompanyName ;
	};	

	UserSrvObj.setCurrentCompany = function(coID, coName){
		localcurrentCompanyId = coID ;
		localcurrentCompanyName = coName ;
	};	

 	return UserSrvObj;
});
*/

/*
FeesApp.factory('BillDataService', function($http, $q) {
	return{
		getBillData : function(id){
			var deffered = $q.defer();
		    var billData = {} ;
			$http.get('/bills/details/' +  id).success(function(response) { 
				var billData = response.data;
				$http.get('/bills/billtranctions/' +  id).then(function(response) { 
					deffered.resolve({
						billData.Transactions =  response.data;
						return billData;
					});
			    });
		    });
		    return deffered.promise ;	
		}
	}
});


FeesApp.factory('BillDataService', function($http, $q) {
	return{
		getBillData : function(id){
			return $http.get('/bills/billfulldata/' + id ) ;
		}
	}
});


*/







FeesApp.controller('companyCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Manage Companies" 
	$scope.sortColumn = 'CO_CODE';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.confirmPassword = "" ;

	$scope.selectedComp = {} ;

//	$scope.selectedComp.CO_CODE = $rootScope.gblCoId ;
//	$scope.selectedComp.COMPANY = $rootScope.gblCoName ;


	var refresh = function() {
	  $http.get('/company/listall').then(function(response) { 
	    $scope.companylist = response.data;
	    $scope.codata = "";
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=============================================
//Add new user
//============================================
    $scope.addCompany = function addCompany() {
    	$scope.rtnMessage="" ;
      	$('#AddNewCompany').modal();
    }

	$scope.registerNewCompany = function(newcompany) {
	  $http.post('/company/register', newcompany).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  });
	};


//=============================================
//Edit the user
//============================================
    $scope.editCompany = function editCompany(row) {
	  	var selectedCoId = row.CO_CODE ;	
	  	$http.get('/company/details/' +  selectedCoId).then(function(response) { 
	    	$scope.selectedCo = response.data;
	  	});
    	$scope.selectedCo = row ;
		$scope.rtnMessage="" ;
	    var index = $scope.companylist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditCompany').modal();
	    }
    }

	$scope.modifyCompany = function(company) {
	  $http.post('/company/update', company).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;

	    refresh();
	  });
	};


//=============================================
//Delete the user
//============================================
    $scope.removeCompany = function removeCompany(row) {
    $scope.selectedCo = row ;
	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.companylist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteCompany').modal();
        }
    }

    $scope.deleteCompany = function deleteCompany(companyid, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/company/delete/' + companyid  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.companylist.splice(currentIndex, 1);
		    refresh();
		  });
        }
    }



    $scope.changeCurrentCo = function changeCurrentCo(companyid, companyName) {
//		UserService.setCurrentCompany(companyid, companyName);
		$rootScope.gblCoId = companyid ;
		$rootScope.gblCoName = companyName ;
//		$location.path('/').replace();

		

		var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()

		console.log(approotpath);
		
		window.open(approotpath,"_self")		


    }


//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}
}]); //End of controller 






FeesApp.controller('groupCntrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope  ) {
	$scope.pagetitle = "Manage Groups" 
	$scope.sortColumn = 'GRP_CODE';
	$scope.sortReverse = false;
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.currentIndex = -1 ;
	$scope.selectedGrp = {} ;
	$scope.pageDataLoaded  = false ;
	var refresh = function() {
	  $http.get('/groups/listall').then(function(response) { 
	    $scope.grouplist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;

	};

	refresh();


//=============================================
//Add new group
//============================================
    $scope.addGroup = function addGroup() {
    	$scope.rtnMessage="" ;
      	$('#AddNewGroup').modal();
    }

	$scope.registerNewGroup = function(newgroup) {
	  $http.post('/groups/register', newgroup).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;

	  	ShowSnackbar($scope.rtnMessage , 0) ;

	    refresh();
	  });
	};


//=============================================
//Edit the Group
//============================================
    $scope.editGroup = function editGroup(row) {
	  	var selectedGrpId = row.GRP_CODE ;	
	  	$http.get('/groups/details/' +  selectedGrpId).then(function(response) { 
	    	$scope.selectedGrp = response.data;
	  	});
    	$scope.selectedGrp = row ;
		$scope.rtnMessage="" ;
	    var index = $scope.grouplist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditGroup').modal();
	    }
    }

	$scope.modifyGroup = function(grp) {
	  $http.post('/groups/update', grp).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;

	  	ShowSnackbar($scope.rtnMessage , 0) ;

	    refresh();
	  });
	};


//=============================================
//Delete the Group
//============================================
    $scope.removeGroup = function removeGroup(row) {
    $scope.selectedGrp = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.grouplist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteGroup').modal();
        }
    }

    $scope.deleteGroup = function deleteGroup(grpId, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/groups/delete/' + grpId  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.grouplist.splice(currentIndex, 1);
		    refresh();
		  });
        }
    }

//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}

}]); //End of controller : GroupCntrl







FeesApp.controller('partyCntrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.pagetitle = "Manage Parties" 
	$scope.sortColumn = 'AC_CODE';
	$scope.sortReverse = false;
//	$scope.searchQuery = '{GRP_CODE: search.GRP_CODE, GRP_NAME: search.GRP_NAME, AC_CODE: search.AC_CODE, AC_NAME: search.AC_NAME }';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values

	$scope.lshowRtnMsg = false ; 

	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.currentIndex = -1 ;
	$scope.selectedPrt = {} ;

	$scope.isIncorrectGroup = false;
	$scope.pageDataLoaded  = false ;


	var refresh = function() {
	  $http.get('/Parties/listall').then(function(response) { 
	    $scope.partylist = response.data;
	  	$scope.pageDataLoaded  = true ;
	    
	  });

	  $http.get('/Parties/namelist').then(function(response) { 
	    $scope.partynamelist = response.data;
	  });

	  $http.get('/Parties/grouplist').then(function(response) { 
	    $scope.grouplist = response.data;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;

	};

	refresh();


//=============================================
//Get the group code based on group name
//============================================
    $scope.getSelectedGrpID = function getSelectedGrpID(grpNm, strAction) {
	  $http.get('/Parties/currentGroupID/' + grpNm).then(function(response) {
	  	if (!response.data.GRP_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	}else {
	  		if(strAction =="ADD") {
	  			$scope.Prt.GRP_CODE = response.data.GRP_CODE ; 		
	  		} else {
	  			$scope.selectedPrt.GRP_CODE = response.data.GRP_CODE ; 		
	  		}
	  		
	  		$scope.isIncorrectGroup = false ;
	  	}
	  });
    }

//=============================================
//Get the Group Name  based on Group code
//============================================
$scope.getSelectedGrpName = function getSelectedGrpName(grpID, strAction) {
    if(grpID != "") {	
		$http.get('/Parties/currentGroupNm/' + grpID).then(function(response) {
		  	if (!response.data.GRP_NAME) {
		  		$scope.isIncorrectGroup = true;
		  	}else {
	  			if(strAction =="ADD") {
		  			$scope.Prt.GRP_NAME = response.data.GRP_NAME ;
		  		} else {
		  			$scope.selectedPrt.GRP_NAME = response.data.GRP_NAME ;
		  		}
		  	}
		 });
	}	  
}



//=============================================
//Add new party
//============================================
    $scope.addParty = function addParty() {
    	$scope.rtnMessage="" ;
      	$('#AddNewParty').modal();
    }

	$scope.registerNewParty = function(newparty) {
	  $http.post('/Parties/register', newparty).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	    refresh();
	  });
	};


//=============================================
//Edit the Group
//============================================
    $scope.editParty = function editParty(row) {
	  	var selectedPrtId = row.AC_CODE ;	
	  	$http.get('/Parties/details/' +  selectedPrtId).then(function(response) { 
	    	$scope.selectedPrt = response.data;
	  	});    	
		$scope.rtnMessage="" ;
	    var index = $scope.partylist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditParty').modal();
	    }
    }

	$scope.modifyParty = function(party) {
	  $http.post('/Parties/update', party).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	    refresh();
	  });
	};


//=============================================
//Delete the Group
//============================================
    $scope.removeParty = function removeParty(row) {
    $scope.selectedPrt = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.partylist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteParty').modal();
        }
    }

    $scope.deleteParty = function deleteParty(prtId, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/parties/delete/' + prtId  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.partylist.splice(currentIndex, 1);
		    refresh();
		  });
        }
    }



//=============================================
//Get the PartyCode code based on Party name
//============================================
    $scope.getSelectedPrtID = function getSelectedPrtID(PartyNm) {
    	if(PartyNm != "") {	
		  $http.get('/parties/currentPartyID/' + PartyNm).then(function(response) {
		  	if (!response.data.AC_CODE) {
		  		$scope.isIncorrectPartu = true;
		  		$scope.PrttoChange.AC_CODE = "Invalid Party !!" ;
		  	}else {
		  		$scope.PrttoChange.AC_CODE = response.data.AC_CODE ;
		  		$scope.isIncorrectGroup = false ;
		  	}
		  });
    	}
    }


//=============================================
//Change the party code of the selected party
//============================================
    $scope.changePartyCode = function changePartyCode(prtCode, action) {
    	if(action =="change") {
			$http.post('/Parties/changePartyCode' , [$scope.PrttoChange]).then(function(response) {
			    $scope.rtnMessage = response.data.message ;
		  		$scope.isRtnMsgErr = response.data.error ;
		  		$scope.lshowRtnMsg = true ;
	  			$scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	  			ShowSnackbar($scope.rtnMessage) ;
			});    		
    	} else {
    		$scope.lshowRtnMsg = false ;
			var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
			console.log(approotpath);
			window.open(approotpath,"_self");
    	}
    }


//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}
}]); 


//End of controller : PartyCntrl






FeesApp.controller('trcdCntrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope  ) {
	$scope.pagetitle = "Manage Transaction Codes" 
	$scope.sortColumn = 'TRCD';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;

	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.currentIndex = -1 ;
	$scope.pageDataLoaded  = false ;


	var refresh = function() {
	  $http.get('/trcds/listall').then(function(response) { 
	    $scope.trcdlist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=============================================
//Add new group
//============================================
    $scope.addTrcd = function addTrcd() {
    	$scope.rtnMessage="" ;
      	$('#AddNewTrcd').modal();
    }

	$scope.registerNewTrcd = function(nTrcd) {
	  $http.post('/trcds/register', nTrcd).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;
	  });
	};


//=============================================
//Edit Trcd
//============================================
    $scope.editTrcd = function editGroupTrcd(row) {
	  	var selectedTrcdId = row.TRCD ;	
	  	$http.get('/trcds/details/' +  selectedTrcdId).then(function(response) { 
	    	$scope.selectedTrcd = response.data;
	  	});
		$scope.rtnMessage="" ;
	    var index = $scope.trcdlist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#EditTrcd').modal();
	    }
    }

	$scope.modifyTrcd = function(trcd) {
	  $http.post('/trcds/update', trcd).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	  });
	};


//=============================================
//Delete Trcd
//============================================
    $scope.removeTrcd = function removeTrcd(row) {
    $scope.selectedTrcd = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.trcdlist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteTrcd').modal();
        }
    }

    $scope.deleteTrcd = function deleteTrcd(trcd, currentIndex) {
        if (currentIndex !== -1) {
		  $http.post('/trcds/delete/' + trcd  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.trcdlist.splice(currentIndex, 1);
		    refresh();

	  		ShowSnackbar($scope.rtnMessage , 0) ;

		  });
        }
    }


//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}
}]); //End of controller : trcdCntrl






FeesApp.controller('trcdsubCntrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope  ) {
	$scope.pagetitle = "Manage Sub-transaction Codes" 
	$scope.sortColumn = 'TRCD';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.currentIndex = -1 ;
	$scope.isIncorrectTrcd = false;
	$scope.pageDataLoaded  = false ;


	var refresh = function() {
	  $http.get('/trcdsubs/listall').then(function(response) { 
	    $scope.trcdsublist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });

	  $http.get('/trcdsubs/trcdlist').then(function(response) { 
	    $scope.trcdlist = response.data;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=============================================
//Get the group code based on group name
//============================================
    $scope.getSelectedTrcdID = function getSelectedTrcdID(trcdNm) {
	  $http.get('/trcdsubs/currentTrcdID/' + trcdNm).then(function(response) {
	  	if (!response.data.TRCD) {
	  		$scope.isIncorrectTrcd = true;
	  	}else {
	  		$scope.selectedTrcdsub.TRCD = response.data.TRCD ; 	
	  		$scope.isIncorrectTrcd = false ;
	  	}
	  });
    }



//=============================================
//Add new Trcdsub
//============================================
    $scope.addTrcdsub = function addTrcdsub() {
    	$scope.rtnMessage="" ;
      	$('#AddNewTrcdsub').modal();
    }

	$scope.registerNewTrcdsub = function(nTrcdsub) {
	  $http.post('/trcdsubs/register', nTrcdsub).then(function(response) {	  	
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	  });
	};


//=============================================
//Edit Trcd
//============================================
    $scope.editTrcdsub = function editTrcdsub(row) {
	  	var selectedTrcdId = row.TRCD + '-' + row.SUBCD ;	
	  	$http.get('/trcdsubs/details/' +  selectedTrcdId).then(function(response) { 
	    	$scope.selectedTrcdsub = response.data;
	  	});
		$scope.rtnMessage="" ;
	    var index = $scope.trcdsublist.indexOf(row);
	    $scope.currentIndex = index ;
	    if (index !== -1) {
	      	$('#editTrcdsub').modal();
	    }
    }

	$scope.modifyTrcdsub = function(trcdsub) {
	  $http.post('/trcdsubs/update', trcdsub).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	  });
	};


//==================================================================================
//Delete Trcd
//==================================================================================
    $scope.removeTrcdsub = function removeTrcdsub(row) {
    $scope.selectedTrcdsub = row ;

    var index = $scope.trcdsublist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteTrcdsub').modal();
        }
    }

    $scope.deleteTrcdsub = function deleteTrcdsub(trcd, currentIndex) {
        if (currentIndex !== -1) {
        	//First call http delete from database
		  $http.post('/trcdsubs/delete/' + trcd  , []).then(function(response) {
		    $scope.rtnMessage = response.data.message ;
	  		$scope.isRtnMsgErr = response.data.error ;
            $scope.trcdlistsub.splice(currentIndex, 1);
		    refresh();
	  		ShowSnackbar($scope.rtnMessage , 0) ;
		  });
        }
    }


//=====================================================================================
// List order by
//=====================================================================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}
}]); //End of controller : trcdsubCntrl






FeesApp.controller('billsCntrl', ['$scope', '$http' , '$q' , 'filterFilter',  function($scope, $http , $q, filterFilter  ) {
	$scope.pagetitle = "Manage Bills" 
	$scope.sortColumn = 'BILL_NO';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.currentIndex = -1 ;
	$scope.selectedBill = {} ;
	$scope.newBill = {} ;
	$scope.isbillschecked = false ;
	$scope.pageDataLoaded  = false ;

//  	$scope.filteredbills = {}; 

	$scope.subcdlist = {} ;
	$scope.selectedBillTran = {} ;
	$scope.selectedTran = {} ;
	$scope.newTranLine = {} ;

//	$scope.selectedbillDt = new Date();

	$scope.rowsubcdlist = [] ;
	$scope.transactionTotal = 0 ;


	var refresh = function() {
	  $http.get('/bills/listall').then(function(response) { 
	    $scope.billslist = response.data;
//	    $scope.filteredbills = $scope.billslist;

	  	$scope.pageDataLoaded  = true ;

	  });

	  $http.get('/bills/partylist').then(function(response) { 
	    $scope.partylist = response.data;
	  });

	  $http.get('/bills/trcdlist').then(function(response) { 
	    $scope.trcdlist = response.data;
	  });

	  $http.get('/bills/trcdsublist').then(function(response) { 
	    $scope.subcdlist = response.data;
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;

//	  $scope.pageDataLoaded = true ;
//	  console.log("Hello world") ;

	};

	refresh();

/*
	$scope.showPage = function() {
		alert("Hello !") ;
  		document.getElementById("loader").style.display = "none";
  		document.getElementById("myDiv").style.display = "block";
	}
*/


//=============================================
// select / deselect  the filtered bills list
//=============================================
	$scope.selectAllBills = function() {
		for (var i =0 ; i < $scope.filteredbills.length ; i++){
			$scope.filteredbills[i].CHECKED = !($scope.isbillschecked) ;
		}
		$scope.isbillschecked = !($scope.isbillschecked) ;
	};


//=============================================
//Add new Bill
//============================================
    $scope.addBill = function addBill() {
      	$scope.rtnMessage="" ;
//      	var strtoday = formatDate(new Date()) ;
      	$scope.selectedBill.BILLID=0 ;
      	$scope.selectedBill.BILL_NO="" ;
      	$scope.selectedBill.BILL_DT= "";
      	$scope.selectedBill.AC_CODE="" ;
      	$scope.selectedBill.AC_NAME="" ;
      	$scope.selectedBill.BILL_AMT=0 ;
      	$scope.selectedBill.LASTBILLID=0 ;

      	$scope.selectedBill.isClosed=false ;
      	$scope.selectedBill.transactions = [] ;

	    $scope.selectedBill.isClosedOld = $scope.selectedBill.isClosed ;

    	$scope.transactionTotal = 0 ; // ($scope.selectedBill.TOT_AMT );
		$scope.selectedBill.selectedbillDt = new Date();

      	var newTransact = {} ;
      	newTransact.BILLID=0 ;  
      	newTransact.CO_CODE=0 ;  
      	newTransact.BILL_NO=0 ;  
      	newTransact.BILL_DT="" ;  
      	newTransact.TRCD="" ;  
      	newTransact.SUBCD="" ;  
      	newTransact.REMARKS="" ;  
      	newTransact.BILL_AMT=0 ;  

		$scope.selectedBill.transactions.push(newTransact);

		$scope.selectedBillTran = $scope.selectedBill.transactions;

      	$('#AddNewBill').modal();

    }

	$scope.registerNewbill = function(newbill) {
//		console.log(newbill);	
		$http.post('/bills/register', newbill).then(function(response) {	  	
		  	$scope.rtnMessage = response.data.message ;
		  	$scope.isRtnMsgErr = response.data.error ;
		  	$scope.transactionTotal = 0 ;
		    refresh();
	  		ShowSnackbar($scope.rtnMessage , 0) ;
		});
	};


//=============================================
//Edit the Bill
//============================================
    $scope.editThisBill = function editThisBill(row) {
	  	var selectedBillId = row.BILLID ;
	  	$http.get('/bills/billfulldata/' +  selectedBillId).then(function(response) { 
	    	$scope.selectedBill = response.data;

//	    	Find if the current bill is closed
	    	$scope.selectedBill.isClosed = (($scope.selectedBill.CLIND == "C") ? true : (($scope.selectedBill.CLIND == "Y") ? true : false));
//          Stores the old value to identify if the value is changed now
	    	$scope.selectedBill.isClosedOld = $scope.selectedBill.isClosed ;

    		$scope.transactionTotal = ($scope.selectedBill.TOT_AMT );
			$scope.selectedBill.selectedbillDt = new Date($scope.selectedBill.BILL_DT);

			$scope.selectedBillTran = $scope.selectedBill.transactions;

			//console.log($scope.selectedBillTran.length);
			// if no transactions exists then add new line
			if($scope.selectedBillTran.length == 0) {
				var newTranLines = {} ;
		    	newTranLines.BILLID=$scope.selectedBill.BILLID;
		    	newTranLines.CO_CODE=$scope.selectedBill.CO_CODE;
		    	newTranLines.BILL_NO=$scope.selectedBill.BILL_NO;
		    	newTranLines.BILL_DT=$scope.selectedBill.BILL_DT;
		    	newTranLines.TRCD="";
		    	newTranLines.TRCDDESC="";
		    	newTranLines.SUBCD="";
		    	newTranLines.SUBDESC="";
		    	newTranLines.REMARKS="";
		    	newTranLines.BILL_AMT=0;
    			$scope.selectedBillTran.push($scope.newTranLine);
			}

			var index = $scope.billslist.indexOf(row);
			 $scope.currentIndex = index ;
			    if (index !== -1) {
			      	$('#EditBill').modal();
			    }	
	  	});    	
    }



	$scope.modifyBill = function(sBilldata) {
	  $http.post('/bills/update', sBilldata).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  	ShowSnackbar($scope.rtnMessage , 0) ;

	  });
	};





//=============================================
//Delete the Bill
//============================================
    $scope.removeBill = function removeBill(row) {
    $scope.selectedBill = row ;
//	$scope.deleteCO_ID = row.CO_CODE ;
    var index = $scope.billslist.indexOf(row);
    $scope.currentIndex = index ;
        if (index !== -1) {
      		$('#DeleteBill').modal();
        }
    }

    $scope.deleteBill = function deleteBill(billtoDelete, currentIndex) {
        var id = "";
        if (currentIndex !== -1) {
       		 id = billtoDelete.BILLID
        	//First call http delete from database
			$http.get('/bills/details/' + id ).then(function(response) { 
			    var billClosedIndic = response.data.CLIND;
			    if(billClosedIndic != 'Y') {
					 $http.post('/bills/delete/' + id  , []).then(function(response) {
					    $scope.rtnMessage = response.data.message ;
				  		$scope.isRtnMsgErr = response.data.error ;
			            $scope.billslist.splice(currentIndex, 1);
					    refresh();
	  					ShowSnackbar($scope.rtnMessage , 0) ;

					});
			    } else {
					$scope.rtnMessage = "Closed bill cannot be deleted" ;
				  	$scope.isRtnMsgErr = true ;
	  				ShowSnackbar($scope.rtnMessage , 1) ;
			    }
			});
        }
    }



//=================================================================================================
//Print selected Bill
// Help : http://pdfmake.org/#/
//===============================================================================================
/*
$scope.PrintBillsaaa = function PrintBillsaaa() {
	console.log("print called !")
	var mypromise =  $scope.getBillsData();
	mypromise.then(function(response){
		console.log(response);
		console.log("pdf generated successfully!")
	});
}
*/

$scope.getBillsData = function getBillsData() {
	var delay = $q.defer();

	var urlcalls = [];
	for(var i=0; i < $scope.billslist.length ; i++){
	    if($scope.billslist[i].CHECKED ){
	  		var selectedBillId = $scope.billslist[i].BILLID ;
	  		urlcalls.push($http.get('/bills/billfulldata/' + selectedBillId ) );
	  	}
	  }
	  
	  $q.all(urlcalls)
	  	.then(function(response){
			//console.log("Added bill  to pdfdd" );
	  		delay.resolve(response);
	  	})
	return delay.promise;
}


$scope.PrintBills = function PrintBills() {
	var win = window.open('', '_blank');
	var pdfdd = {} ;
	var delay = $q.defer();

	$http.get('/bills/CurrentCoData').then(function(response) {
	  	if (!response.data.CO_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	} else {
	  		var coData = response.data ;
	  		$scope.isIncorrectGroup = false ;
			var mydoc = JSON.stringify(ddSingleBill) ;
			mydoc = mydoc.replace(/<<CO_NAME>>/g, coData.COMPANY);
			mydoc = mydoc.replace(/<<CO_DESCR>>/g, coData.CO_DESCR);

			var coAdd = " "
			coAdd = coAdd +  ((typeof coData.ADD1 === "undefined") ? "" : coData.ADD1);
			coAdd = coAdd +  ((typeof coData.ADD2 === "undefined") ? "" : ", " + coData.ADD2);
			coAdd = coAdd +  ((typeof coData.ADD3 === "undefined") ? "" : ", " + coData.ADD3);
			coAdd = coAdd +  ((typeof coData.CITY_DIST === "undefined") ? "" : " , Dist/City :" + coData.CITY_DIST);
			coAdd = coAdd +  ((typeof coData.STATE === "undefined") ? "" : ", " + coData.STATE);
			coAdd = coAdd +  ((typeof coData.PIN === "undefined") ? "" : ", PIN -" + coData.PIN);

			mydoc = mydoc.replace(/<<CO_ADD>>/g, coAdd);
			

			var coTel = " "
			coTel = coTel +  ((typeof coData.TEL1 === "undefined") ? "" : coData.TEL1);
			coTel = coTel +  ((typeof coData.TEL2 === "undefined") ? "" : "/" + coData.TEL2);

			coTel = coTel.substring(0,20);

			mydoc = mydoc.replace(/<<CO_TEL>>/g, coTel);
			coEmail = ((typeof coData.EMAIL === "undefined") ? "" : "Email : " + coData.EMAIL);
			mydoc = mydoc.replace(/<<CO_EMAIL>>/g, coEmail);

			var coBankNm = ((typeof coData.BANK_NAME === "undefined") ? "" : coData.BANK_NAME);
			var coBankType = ((typeof coData.AC_TYPE === "undefined") ? "" : coData.AC_TYPE);
			coBankNm = coBankNm + " [" + coBankType + " Account]";

			var coIFSC = ((typeof coData.IFSC_CODE === "undefined") ? "" : coData.IFSC_CODE);
			var coBankAcc = ((typeof coData.AC_NUM === "undefined") ? "" : coData.AC_NUM);

			mydoc = mydoc.replace('<<BANK_NAME>>', coBankNm );
			mydoc = mydoc.replace('<<IFSC>>', coIFSC );
			mydoc = mydoc.replace('<<BANK_ACC>>', coBankAcc );

			pdfdd = JSON.parse(mydoc);
			
			var strsinglebillcontent = JSON.stringify(pdfdd.content[0])
			var strbillline = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1])
			var strbillBlankLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[2])
			var strbillTotLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[3])

			var mypromise =  $scope.getBillsData();
			mypromise.then(function(response){
				billCount=0;
	    		for(var i=0; i < response.length ; i++){
					//get the full data of bill
	    			var cBilltoPrint =  response[i].data 

//	    			console.log(cBilltoPrint.BILL_NO);

					//format headers in pdfdd document
				    strBillContent = getBillHeaders(cBilltoPrint, cBilltoPrint.BILLID, strsinglebillcontent);	
						//repeat each transaction and format pdfdd document
						var billobj =  JSON.parse( strBillContent );
						var lineNo= 1 ;
						var itemNo= 1 ;
						for(var k=0; k < cBilltoPrint.transactions.length ; k++) {
								sline = cBilltoPrint.transactions[k];
					    		var tranName = sline.TRCDDESC
					    		tranName =   ((typeof sline.SUBDESC === "undefined") ? tranName : tranName + "-" + sline.SUBDESC);
					    		if (sline.TRCD == 'OST' ) {
					    			tranName = tranName + " [ " + sline.REMARKS + " ]";
					    		} 

								tranName = convertValidJSON(tranName);

					    		var strbline = "" ;
					    		strbline = strbillline ; 
					    		strbline = strbline.replace('<<LINE>>', itemNo.toString() );
					    		strbline = strbline.replace('<<BILL_TRAN>>', tranName);

					    		strbline = strbline.replace('<<TRAN_AMT>>', numberWithCommas(sline.BILL_AMT));

					    		billobj.table.body[2][0].table.body[lineNo] =  JSON.parse(strbline);

					    		if (sline.REMARKS != '' && sline.TRCD != 'OST' ) {
					    			lineNo++;

						    		var strbline = "" ;
						    		strbline = strbillline ; 
						    		strbline = strbline.replace('<<LINE>>', ' ' );
						    		strbline = strbline.replace('<<BILL_TRAN>>', '  * ' + convertValidJSON(sline.REMARKS));
						    		strbline = strbline.replace('<<TRAN_AMT>>', ' ');

					    			billobj.table.body[2][0].table.body[lineNo] =  JSON.parse(strbline);
					    		}

/*
					    		if(lineNo == 1){
					    			billobj.table.body[2][0].table.body[1] =  JSON.parse(strbline);
					    		} else {
									billobj.table.body[2][0].table.body.splice(2, 0, JSON.parse(strbline));
					    		}
*/
					    		itemNo++;
					    		lineNo++;
					    	}
					    	
						strBillContent = JSON.stringify(billobj);			 
				    	if (billCount > 0) {
				    		var newbillcontent = JSON.parse(strBillContent);
				    		pdfdd.content.push(newbillcontent);
				    	} else {
				    		pdfdd.content[0] = JSON.parse(strBillContent);
				    	}
				    	billCount++;
	    		}

				// Custom table layout
				pdfMake.tableLayouts = {
				  billtblLayout: {
					hLineWidth: function (i, node) {
				    	return (i === 0 || i === node.table.body.length) ? 2 : 1;
				    },
				    vLineWidth: function (i, node) {
				        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				    },
				    hLineColor: function (i, node) {
				        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
				    },
				    vLineColor: function (i, node) {
				        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
				    }
				  }
				};
				pdfMake.createPdf(pdfdd).open({}, win);
			});  		
	    }
	});
	
}


function getBillHeaders(cBilltoPrint, billId, blankBillContent ){
	var rtnval = "" ;
	var billDate = "" ;
	    billDate =  cBilltoPrint.BILL_DT.substring(8,10) + "/" + cBilltoPrint.BILL_DT.substring(5,7) + "/" + cBilltoPrint.BILL_DT.substring(0,4);
		rtnval = blankBillContent;
		rtnval = rtnval.replace('<<BILL_NO>>', cBilltoPrint.BILL_NO);
		rtnval = rtnval.replace('<<BILL_DATE>>', billDate);

//		console.log(cBilltoPrint.BILL_NO);
		var acname = convertValidJSON(cBilltoPrint.AC_NAME);

		rtnval = rtnval.replace('<<PARTY_NM>>', acname);

		var prtAdd1 = ((typeof cBilltoPrint.ADDRESS1 === "undefined") ? " " : cBilltoPrint.ADDRESS1);
		prtAdd1 = convertValidJSON(prtAdd1);

		rtnval = rtnval.replace('<<PARTY_ADD1>>', prtAdd1);
		var prtAdd2 = ((typeof cBilltoPrint.ADDRESS2 === "undefined") ? " " : cBilltoPrint.ADDRESS2);
		prtAdd2 = convertValidJSON(prtAdd2);

		rtnval = rtnval.replace('<<PARTY_ADD2>>', prtAdd2);

		var prtAdd3 = ((typeof cBilltoPrint.ADDRESS3 === "undefined") ? " " : cBilltoPrint.ADDRESS3);
		prtAdd3 = prtAdd3 + ((typeof cBilltoPrint.ADDRESS4 === "undefined") ? "" : ", " + cBilltoPrint.ADDRESS4);
		prtAdd3 = convertValidJSON(prtAdd3);
		rtnval = rtnval.replace('<<PARTY_ADD3>>', prtAdd3);

		rtnval = rtnval.replace('<<TOT_AMT>>', numberWithCommas(cBilltoPrint.TOT_AMT));

		var AmtinWords = "Rupees " + convertInWords(cBilltoPrint.TOT_AMT) + " Only.";

		rtnval = rtnval.replace('<<AMTINWORDS>>', AmtinWords);

		return rtnval;
}

//==[End of : Print bills functions ]==================================================================

	$scope.updaterowsubcdlist = function updaterowsubcdlist(trcdid) {
		$scope.rowsubcdlist = [] ;
		for (var i =0 ; i < $scope.subcdlist.length ; i++){
			var item = $scope.subcdlist[i];
			if (item.TRCD == trcdid) {
				$scope.rowsubcdlist.push(item);
			}
		}
	} ;


//=============================================
//Get the Party Name  based on Party code
//============================================
$scope.getSelectedPrtName = function getSelectedPrtName(PartyID) {
    if(PartyID != "") {	
		$http.get('/bills/currentPartyNm/' + PartyID).then(function(response) {
		  	if (!response.data.AC_NAME) {
		  		$scope.isIncorrectGroup = true;
		  	}else {
		  		$scope.selectedBill.AC_NAME = response.data.AC_NAME ;
		  	}
		 });
	}	  
}


//=============================================
//Get the PartyCode code based on Party name
//============================================
    $scope.getSelectedPrtID = function getSelectedPrtID(PartyNm, action) {
    	if(PartyNm != "") {	
		  $http.get('/bills/currentPartyID/' + PartyNm).then(function(response) {
		  	if (!response.data.AC_CODE) {
		  		$scope.isIncorrectGroup = true;
		  	}else {
		  		$scope.selectedBill.AC_CODE = response.data.AC_CODE ;
		  		//if Action is Add then find previous balance and update the first row 
		  		if(action=="Add") {
		  			$http.get('/bills/PreviousBal/' + $scope.selectedBill.AC_CODE).then(function(response) {
		  				if(!response.data.message) {
			  				$scope.selectedBill.transactions[0].TRCD="OST";
			  				$scope.selectedBill.transactions[0].TRCDDESC="Previous Balance";
			  				$scope.selectedBill.transactions[0].SUBCD="";
			  				$scope.selectedBill.transactions[0].SUBDESC="";
			  				$scope.selectedBill.transactions[0].REMARKS="Bill No : " + response.data.BILL_NO + " dtd :  " + response.data.BILL_DT ;
			  				$scope.selectedBill.transactions[0].BILL_AMT=response.data.BAL_AMT;
							$scope.selectedBill.LASTBILLID=response.data.BILLID ;
							$scope.selectedBill.TOT_AMT = response.data.BAL_AMT;
							$scope.transactionTotal = response.data.BAL_AMT;
							//console.log(response.data.BAL_AMT);
		  				}	
					});		  			
		  		}
		  		$scope.isIncorrectGroup = false ;
		  	}
		  });
    	}
    }



//=============================================
//Get the TRCDCode code based on TRCD name
//============================================
    $scope.getTRCDID = function getTRCDID(trcdNm, index) {
      var oldTRCD = $scope.selectedBillTran[index].TRCD ;
      if (trcdNm != "" ) {
		  $http.get('/bills/currentTrcdID/' + trcdNm).then(function(response) {
		  	if (!response.data.TRCD) {
		  		$scope.isIncorrectGroup = true;
		  	}else {
		  		$scope.selectedBillTran[index].TRCD = response.data.TRCD ; 	
		  		$scope.isIncorrectGroup = false ;
		  		$scope.updaterowsubcdlist($scope.selectedBillTran[index].TRCD);

		  		// if changed remove the subcd details
		  		if(oldTRCD != $scope.selectedBillTran[index].TRCD) {
		  			$scope.selectedBillTran[index].SUBCD="";
		  			$scope.selectedBillTran[index].SUBDESC="";
		  		}
		  	}
		  });
      }
    }


//=============================================
//Get the SubCDCode code based on TRCD ID and subcd name
//============================================
    $scope.getSUBCDID = function getSUBCDID(subcdnm, trcdid, index) {
      var id = 	subcdnm + '|' + trcdid ;

	 var paramdata = {} ; 
	 paramdata.subcdnm = subcdnm ;
	 paramdata.trcdid = trcdid ;

	  $http.post('/bills/currentSUBCDIDp', paramdata).then(function(response) {
	  	if (!response.data.SUBCD) {
	  		$scope.isIncorrectGroup = true;
	  	}else {
	  		$scope.selectedBillTran[index].SUBCD = response.data.SUBCD ; 	
	  		$scope.isIncorrectGroup = false ;
	  	}
	  });
    }


    $scope.addBillline = function addBillline(row) {
    	$scope.newTranLine = angular.copy(row) ;
    	$scope.newTranLine.TRCD="";
    	$scope.newTranLine.TRCDDESC="";
    	$scope.newTranLine.SUBCD="";
    	$scope.newTranLine.SUBDESC="";
    	$scope.newTranLine.REMARKS="";
    	$scope.newTranLine.BILL_AMT=0;
    	$scope.selectedBillTran.push($scope.newTranLine);
    }


    $scope.removeBillline = function removeBillline(row, index) {
    	$scope.selectedBillTran.splice(index, 1);
		$scope.getBillTotal(); 

			// if no transactions exists then add new line
			if($scope.selectedBillTran.length == 0) {
		    	$scope.newTranLine.BILLID=$scope.selectedBill.BILLID;
		    	$scope.newTranLine.CO_CODE=$scope.selectedBill.CO_CODE;
		    	$scope.newTranLine.BILL_NO=$scope.selectedBill.BILL_NO;
		    	$scope.newTranLine.BILL_DT=$scope.selectedBill.BILL_DT;
		    	$scope.newTranLine.TRCD="";
		    	$scope.newTranLine.TRCDDESC="";
		    	$scope.newTranLine.SUBCD="";
		    	$scope.newTranLine.SUBDESC="";
		    	$scope.newTranLine.REMARKS="";
		    	$scope.newTranLine.BILL_AMT=0;
    			$scope.selectedBillTran.push($scope.newTranLine);
			}
    }


	$scope.getBillTotal = function(){		
	    $scope.transactionTotal = 0;
	    for(var i = 0; i < $scope.selectedBillTran.length; i++){
	        $scope.transactionTotal += ($scope.selectedBillTran[i].BILL_AMT);
	    }
	    total = $scope.transactionTotal ;
/*
		$scope.selectedBill.TOT_GST = $scope.transactionTotal * 0.1;
		$scope.selectedBill.SGST = $scope.selectedBill.TOT_GST / 2;
		$scope.selectedBill.CGST = $scope.selectedBill.TOT_GST - $scope.selectedBill.SGST ;

		$scope.selectedBill.BILL_AMT= $scope.transactionTotal + $scope.selectedBill.TOT_GST  ;
		$scope.selectedBill.TOT_AMT= $scope.selectedBill.BILL_AMT +  $scope.selectedBill.PREV_BAL ;
*/
		$scope.selectedBill.BILL_AMT= total ;
		$scope.selectedBill.TOT_AMT= total ;
	}




//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}

}]); 


//End of controller : BillsCntrl



FeesApp.controller('rcptCntrl', ['$scope', '$http' , '$q' ,  function($scope, $http , $q  ) {
	$scope.pagetitle = "Manage Receipts" 
	$scope.sortColumn = 'BILL_NO';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.pageDataLoaded  = false ;

	$scope.currentIndex = -1 ;
	$scope.selectedBill = {} ;

	var refresh = function() {
	  $http.get('/receipts/listall').then(function(response) { 
	    $scope.billslist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


$scope.isValidDate = function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

//=============================================
//Edit the Bill
//============================================
    $scope.enterReceipts = function enterReceipts(row) {
	  	var selectedBillId = row.BILLID ;

	  	$http.get('/receipts/details/' +  selectedBillId).then(function(response) { 
	    	$scope.selectedBill = response.data;

	    	if($scope.selectedBill.CASH1 == null) {
	    		$scope.selectedBill.CASH1 = 0
	    	}

	    	if($scope.selectedBill.CASH2 == null) {
	    		$scope.selectedBill.CASH2 = 0
	    	}

	    	if($scope.selectedBill.CHEQUE1 == null) {
	    		$scope.selectedBill.CHEQUE1 = 0
	    	}

	    	if($scope.selectedBill.CHEQUE2 == null) {
	    		$scope.selectedBill.CHEQUE2 = 0
	    	}

//	    	Find if the current bill is closed
	    	$scope.selectedBill.isClosed = (($scope.selectedBill.CLIND == "C") ? true : (($scope.selectedBill.CLIND == "Y") ? true : false));
//          Stores the old value to identify if the value is changed now
	    	$scope.selectedBill.isClosedOld = $scope.selectedBill.isClosed ;
			$scope.selectedBill.selectedbillDt = new Date($scope.selectedBill.BILL_DT);

			if($scope.selectedBill.RCPT_DATE != null) {
				$scope.selectedBill.RcptDt1 = new Date($scope.selectedBill.RCPT_DATE);
			}

			if($scope.selectedBill.RCPT_DATE2 != null) {				
				$scope.selectedBill.RcptDt2 = new Date($scope.selectedBill.RCPT_DATE2);
			}

//	    	console.log($scope.selectedBill.RcptDt2);

			var index = $scope.billslist.indexOf(row);
			 $scope.currentIndex = index ;
			    if (index !== -1) {
			      	$('#EditReceipt').modal();
			    }	
	  	});    	
    }

	$scope.modifyReceipt = function(sReceiptdata) {
	  $http.post('/receipts/update', sReceiptdata).then(function(response) {
	  	$scope.rtnMessage = response.data.message ;
	  	$scope.isRtnMsgErr = response.data.error ;
	    refresh();
	  });
	};

	$scope.getRcptTotal = function(){
		$scope.selectedBill.CASH = $scope.selectedBill.CASH1 + $scope.selectedBill.CASH2
		$scope.selectedBill.CHEQUE = $scope.selectedBill.CHEQUE1 + $scope.selectedBill.CHEQUE2
		$scope.selectedBill.RCPT_AMT = $scope.selectedBill.CASH + $scope.selectedBill.CHEQUE
		$scope.selectedBill.BAL_AMT = $scope.selectedBill.TOT_AMT - $scope.selectedBill.RCPT_AMT
	}


//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}

}]); 


//End of controller : RcptCntrl



FeesApp.controller('osCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Outstandings" 
	$scope.sortColumn = 'CO_CODE';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	$scope.confirmPassword = "" ;
	$scope.selectedComp = {} ;

	$scope.pageDataLoaded  = false ;


	var refresh = function() {
	  $http.get('/Outstandings/listall').then(function(response) { 
	    $scope.companylist = response.data;
	    $scope.codata = "";
	  	$scope.pageDataLoaded  = true ;

	  });

	  $http.get('../groups/listall').then(function(response) { 
	    $scope.grouplist = response.data;
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}


$scope.PrintOSReport = function PrintOSReport() {
	var processreport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA"}' ) ;

	if ($scope.ReportOption == 2) {
		var selgroupstring = "(" ;
		for(var i=0; i < $scope.grouplist.length ; i++){
		    if($scope.grouplist[i].CHECKED ){
		    	selgroupstring = selgroupstring + "'" + $scope.grouplist[i].GRP_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selgroupstring = selgroupstring.substr(0, selgroupstring.length - 1) + ")";
		}  else {
			selgroupstring = "( 'NA' )";
		}
		dataOptions.datascope = 2  ; 
		dataOptions.grouplist = selgroupstring ;
	} 

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		var win = window.open('', '_blank');
		var pdfdd = {} ;

		$http.post('/outstandings/allOS', dataOptions ).then(function(response) {
		  	if (!response.data) {
		  		//$scope.isIncorrectGroup = true;
		  		//show error
		  	} else {
		  		var osdata = response.data ;
				var mydoc = JSON.stringify(ddOSReg) ;
				var todaysDt = appToday() ;

				mydoc = mydoc.replace(/<<ASON_DT>>/g, todaysDt);
				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);

				pdfdd = JSON.parse(mydoc);

				var strGrpline = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);			
				var strbillline = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[1]);
				var strGrpTot = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[2]);

				//console.log(strGrpTot);
				pdfdd = JSON.parse(mydoc);

		    	var billDate =  "";
				var grpid = "" ;
				var grpBillTot = 0 ;
				var grpRcptTot = 0 ;
				var grpBalTot = 0 ;
		    	for(var i=0; i < osdata.length ; i++){
					if(osdata[i].GRP_CODE != grpid) {
			    		if (i != 0) {
			    			var strline =  strGrpTot.replace('<<GRP_BILL_TOT>>', numberWithCommas(grpBillTot)) ;
			    			var strline =  strline.replace('<<GRP_RCPT_TOT>>', numberWithCommas(grpRcptTot)) ;
			    			var strline =  strline.replace('<<GRP_BAL_TOT>>', numberWithCommas(grpBalTot)) ;

				    		var newbilline = JSON.parse(strline);
				    		pdfdd.content[0].table.body[3][0].table.body.push(newbilline);
			    		}

			    		var strline =  strGrpline.replace('<<GROUP_ID>>', osdata[i].GRP_CODE ) ;
			    		var newbilline = JSON.parse(strline);
			    		pdfdd.content[0].table.body[3][0].table.body.push(newbilline);

						grpBillTot = 0 ;
						grpRcptTot = 0 ;
						grpBalTot = 0 ;
						grpid = osdata[i].GRP_CODE ;
					} 

		   			billDate = strDateDDMMYYYY(osdata[i].BILL_DT) ;
			    	
			    	var strline =  strbillline.replace('<<PARTY_NAME>>', osdata[i].AC_CODE + ' - ' + osdata[i].AC_NAME ) ;
			    	var strline =  strline.replace('<<CO_NAME>>', osdata[i].COMPANY ) ;
			    	var strline =  strline.replace('<<BILL>>', osdata[i].BILL_NO ) ;
			    	var strline =  strline.replace('<<BILL_DT>>', billDate ) ;

			    	var strline =  strline.replace('<<BILL_AMT>>', numberWithCommas(osdata[i].TOT_AMT) ) ;
			    	var strline =  strline.replace('<<RCPT_AMT>>', numberWithCommas(osdata[i].RCPT_AMT) ) ;
			    	var strline =  strline.replace('<<BAL_AMT>>', numberWithCommas(osdata[i].BAL_AMT) ) ;
					grpBillTot = grpBillTot + osdata[i].TOT_AMT;
					grpRcptTot = grpRcptTot + osdata[i].RCPT_AMT;
					grpBalTot = grpBalTot + osdata[i].BAL_AMT;

			    	var newbilline = JSON.parse(strline);
			    	pdfdd.content[0].table.body[3][0].table.body.push(newbilline);
		    	}

		    	//Add totoal line for last group	
			    var strline =  strGrpTot.replace('<<GRP_BILL_TOT>>', numberWithCommas(grpBillTot)) ;
			    var strline =  strline.replace('<<GRP_RCPT_TOT>>', numberWithCommas(grpRcptTot)) ;
			    var strline =  strline.replace('<<GRP_BAL_TOT>>', numberWithCommas(grpBalTot)) ;
				var newbilline = JSON.parse(strline);
				pdfdd.content[0].table.body[3][0].table.body.push(newbilline);

				pdfdd.content[0].table.body[3][0].table.body.splice(2,1);
				pdfdd.content[0].table.body[3][0].table.body.splice(1,1);
				pdfdd.content[0].table.body[3][0].table.body.splice(0,1);

				pdfMake.createPdf(pdfdd).open({}, win);
		    }
		});
	} else {
		alert("No group selected for printing !!") ;
		$scope.rtnMessage = "No groups selected !!" ;
		$scope.isRtnMsgErr = "Yes" ;
	}
}


//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}

}]); //End of controller : UserListCntrl






FeesApp.controller('BillRegCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {

	$scope.pagetitle = "Bill Register" 
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.selectedComp = {} ;

	var refresh = function() {
	  $http.get('/Outstandings/listall').then(function(response) { 
	    $scope.companylist = response.data;
	    $scope.codata = "";
	  });
	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();



$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}


$scope.PrintBillReg = function PrintBillReg() {
	var win = window.open('', '_blank');
	var pdfdd = {} ;

	var paramdata = {} ; 
	var mydoc = JSON.stringify(ddbillReg) ;

	pdfdd = JSON.parse(mydoc);

	var strHdr1line = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[0]);
	var strHdr2Line = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1]);
	var strDataLine = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);
//	var strTotalLine = JSON.stringify(pdfdd.content[0].table.body[4][0].table.body[0]);


	var strHdr1col = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[0][4]);
	var strHdr2col = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1][4]);
	var strDatacol = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0][4]);
	var strGTotCol = JSON.stringify(pdfdd.content[0].table.body[4][0].table.body[0][4]);


	//remove all the Amount columns from header 1
	pdfdd.content[0].table.body[2][0].table.body[0].splice(4,10);

	//remove all the Amount columns from header 2
	pdfdd.content[0].table.body[2][0].table.body[1].splice(4,10);

	//remove all the Amount columns from Data line 1
	pdfdd.content[0].table.body[3][0].table.body[0].splice(4,10);

	//remove all the Amount columns from Data line 2
	pdfdd.content[0].table.body[3][0].table.body[1].splice(4,10);

	//remove all the Amount columns from Grand Total line 
	pdfdd.content[0].table.body[4][0].table.body[0].splice(4,10);


	mydoc = JSON.stringify(pdfdd) ;

	$http.get('../bills/CurrentCoData').then(function(response) {
	  	if (!response.data.CO_CODE) {
	  		$scope.isIncorrectGroup = true;
	  	} else {	
			paramdata.CO_CODE = response.data.CO_CODE ;
			paramdata.CO_NAME = response.data.COMPANY ;
			$http.get('/billreg/CurrentYearData').then(function(response) {
				paramdata.YEAR = response.data.YEAR ;
				paramdata.FROM_DT = response.data.FROM_DT ;
				paramdata.TO_DT = response.data.TO_DT ;

				var todaysDt = appToday() ;

				var fromDate = "" ;
	    		fromDate =  paramdata.FROM_DT.substring(8,10) + "/" + paramdata.FROM_DT.substring(5,7) + "/" + paramdata.FROM_DT.substring(0,4);

				var toDate = "" ;
	    		toDate =  paramdata.TO_DT.substring(8,10) + "/" + paramdata.TO_DT.substring(5,7) + "/" + paramdata.TO_DT.substring(0,4);


				mydoc = mydoc.replace(/<<CO_NAME>>/g, paramdata.CO_NAME);
				mydoc = mydoc.replace(/<<FROM_DT>>/g, fromDate);
				mydoc = mydoc.replace(/<<TO_DT>>/g, toDate);

				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);


				pdfdd = JSON.parse(mydoc);

				$http.post('/billreg/headernames', paramdata).then(function(resp) {
					var hdrdata = resp.data ;

					//Fill header 1
					for(var i=0; i < hdrdata.length ; i++){
						var jHdr =  JSON.parse(strHdr1col);
						jHdr.text = hdrdata[i].DESC ;
		    			pdfdd.content[0].table.body[2][0].table.body[0].push(jHdr);
					}
					var jHdr =  JSON.parse(strHdr1col);
					jHdr.text = "Previous Balance" ;
		    		pdfdd.content[0].table.body[2][0].table.body[0].push(jHdr);

					var jHdr =  JSON.parse(strHdr1col);
					jHdr.text = "Total" ;
		    		pdfdd.content[0].table.body[2][0].table.body[0].push(jHdr);


		    		//Header 2
					for(var i=0; i < hdrdata.length ; i++){
						var jHdr =  JSON.parse(strHdr2col);
						jHdr.text = hdrdata[i].TRCD ;
		    			pdfdd.content[0].table.body[2][0].table.body[1].push(jHdr);
					}
					var jHdr =  JSON.parse(strHdr2col);
					jHdr.text = " " ;
		    		pdfdd.content[0].table.body[2][0].table.body[1].push(jHdr);

					var jHdr =  JSON.parse(strHdr2col);
					jHdr.text = " " ;
		    		pdfdd.content[0].table.body[2][0].table.body[1].push(jHdr);


					//Fill Grand Total Line
					for(var i=0; i < hdrdata.length ; i++){
						var jHdr =  JSON.parse(strGTotCol);
						jHdr.text = "<<GT" + hdrdata[i].TRCD  +  ">>";
		    			pdfdd.content[0].table.body[4][0].table.body[0].push(jHdr);
		    			//Make place to store the Total Amount
		    			hdrdata[i].Amount = 0 ;
					}
					var jHdr =  JSON.parse(strGTotCol);
					jHdr.text = "<<GTOST>>" ;
		    		pdfdd.content[0].table.body[4][0].table.body[0].push(jHdr);

					var jHdr =  JSON.parse(strGTotCol);
					jHdr.text = "<<GTTOT>>" ;
		    		pdfdd.content[0].table.body[4][0].table.body[0].push(jHdr);


		    		//Data line 1
					for(var i=0; i < hdrdata.length ; i++){
						var jHdr =  JSON.parse(strDatacol);
						jHdr.text = "<<" + hdrdata[i].TRCD  +  ">>";
		    			pdfdd.content[0].table.body[3][0].table.body[0].push(jHdr);
					}
					var jHdr =  JSON.parse(strDatacol);
					jHdr.text = "<<OST>>" ;
		    		pdfdd.content[0].table.body[3][0].table.body[0].push(jHdr);

					var jHdr =  JSON.parse(strDatacol);
					jHdr.text = "<<TOTAL>>" ;
		    		pdfdd.content[0].table.body[3][0].table.body[0].push(jHdr);


		    		//Data line 2
					for(var i=0; i < hdrdata.length ; i++){
		    			pdfdd.content[0].table.body[3][0].table.body[1].push({});
					}
		    		pdfdd.content[0].table.body[3][0].table.body[1].push({});
		    		pdfdd.content[0].table.body[3][0].table.body[1].push({});
		    		pdfdd.content[0].table.body[3][0].table.body[1][1].colSpan = (hdrdata.length + 2 + 3);
		    		
		    		var billLine1 = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);
		    		var billLine2 = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[1]);
					$http.post('/billreg/billsdata', paramdata).then(function(response) {
						var billdata = response.data ;
						var billTot = 0 ;
						var curBillId = billdata[0].BILLID ;
						var trcdData = "("   ; 
						var dataln1 = billLine1 ;
						var OSTgrandTotal = 0 ;
						var GrandTotal = 0 ;

						for(var i=0; i < billdata.length ; i++){

							//Make the totals
							for(var j=0; j < hdrdata.length ; j++){
								if ( hdrdata[j].TRCD  == billdata[i].TRCD ) {
									hdrdata[j].Amount = hdrdata[j].Amount + billdata[i].BILLAMT ;
									break ;
								}   
							}

							if (billdata[i].TRCD == "OST" ) {
								OSTgrandTotal = OSTgrandTotal + billdata[i].BILLAMT  ;
							}
							GrandTotal = GrandTotal + billdata[i].BILLAMT ;


							if(curBillId != billdata[i].BILLID) {

								var billDate = "" ;
	    						billDate =  billdata[i-1].BILL_DT.substring(8,10) + "/" + billdata[i-1].BILL_DT.substring(5,7) + "/" + billdata[i-1].BILL_DT.substring(0,4);

								//update data for previous row
								dataln1 = dataln1.replace( '<<BILLNO>>' , billdata[i-1].BILL_NO);
								dataln1 = dataln1.replace( '<<BILL_DT>>' , billDate);
								dataln1 = dataln1.replace( '<<PARTY_NAME>>' , billdata[i-1].AC_NAME);
								dataln1 = dataln1.replace( '<<AC_CODE>>' , billdata[i-1].AC_CODE);
								dataln1 = dataln1.replace( '<<TOTAL>>' , numberWithCommas(billTot));

								//Now remove all unused TRCDs
								for(var k=0; k < hdrdata.length ; k++){
									var srchtrcd =  "<<" + hdrdata[k].TRCD + ">>"
									dataln1 = dataln1.replace( srchtrcd , "-");
								}
								dataln1 = dataln1.replace( "<<OST>>" , "-");

								pdfdd.content[0].table.body[3][0].table.body.push(JSON.parse(dataln1));

								trcdData = trcdData + ")";
								var dataln2 = billLine2.replace(/<<TRCD_DATA>>/g, trcdData);								
								pdfdd.content[0].table.body[3][0].table.body.push(JSON.parse(dataln2));

								//Srart new data for current line
								curBillId = billdata[i].BILLID ;
								trcdData = "(" + billdata[i].TRANLIST ;
								billTot = billdata[i].BILLAMT ;
								dataln1 = billLine1 ;
								var srchtrcd =  "<<" + billdata[i].TRCD + ">>"
								dataln1 = dataln1.replace( srchtrcd , numberWithCommas(billdata[i].BILLAMT));

							} else {
								//if (i != 0 ) {
									trcdData = trcdData + " , " + billdata[i].TRANLIST ;

									var srchtrcd =  "<<" + billdata[i].TRCD + ">>"
									dataln1 = dataln1.replace( srchtrcd , numberWithCommas(billdata[i].BILLAMT));
									billTot = billTot + billdata[i].BILLAMT ;
								//}
							}							
						}
						//remove first two lines which 
						pdfdd.content[0].table.body[3][0].table.body.splice(0,2);

						//Update the totals
						mydoc = JSON.stringify(pdfdd) ;
						for(var j=0; j < hdrdata.length ; j++){
							var srchtrcd =  "<<GT" + hdrdata[j].TRCD + ">>" ;
							mydoc = mydoc.replace(srchtrcd, numberWithCommas(hdrdata[j].Amount));
						}
						mydoc = mydoc.replace("<<GTOST>>", numberWithCommas(OSTgrandTotal));
						mydoc = mydoc.replace("<<GTTOT>>", numberWithCommas(GrandTotal));

						pdfdd = JSON.parse(mydoc);
						
//						mydoc = JSON.stringify(pdfdd) ;
//						pdfdd = JSON.parse(mydoc);
						pdfMake.createPdf(pdfdd).open({}, win);

					});

				});
			});

		}
			
	});
}

}]); //End of controller : BillRegCntrl






FeesApp.controller('LedgerCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Ledgers" 
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.selectedComp = {} ;

	var refresh = function() {
	  $http.get('../Parties/listall').then(function(response) { 
	    $scope.partylist = response.data;
	  });

	  $http.get('../billreg/CurrentYearData').then(function(response) {
		$scope.dtFromDate = new Date(response.data.FROM_DT) ;
		$scope.dtToDate = new Date(response.data.TO_DT) ;
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=================================================================================================
// Print ledger
// Help : http://pdfmake.org/#/
//===============================================================================================

$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}


$scope.PrintLedger = function PrintLedger() {
	var processreport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA"}' ) ;

	if ($scope.ReportOption == 2) {
		var selLedstr = "(" ;
		for(var i=0; i < $scope.partylist.length ; i++){
		    if($scope.partylist[i].CHECKED ){
		    	selLedstr = selLedstr + "'" + $scope.partylist[i].AC_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selLedstr = selLedstr.substr(0, selLedstr.length - 1) + ")";
		}  else {
			selLedstr = "( 'NA' )";
		}
		dataOptions.datascope = 2  ; 
		dataOptions.partylist = selLedstr ;
	} 

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		var win = window.open('', '_blank');
		var pdfdd = {} ;
		var paramdata = {} ; 
		var mydoc = JSON.stringify(ddLedger) ;
		pdfdd = JSON.parse(mydoc);

		$http.get('../bills/CurrentCoData').then(function(response) {
			if (!response.data.CO_CODE) {
			  	$scope.isIncorrectGroup = true;
			 } else {
				dataOptions.CO_CODE = response.data.CO_CODE ;
				dataOptions.CO_NAME = response.data.COMPANY ;
				dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
				dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;

				var todaysDt = appToday() ;

				mydoc = mydoc.replace(/<<CO_NAME>>/g, dataOptions.CO_NAME);
				mydoc = mydoc.replace(/<<FROM_DT>>/g, dateinDDMMYYYY($scope.dtFromDate));
				mydoc = mydoc.replace(/<<TO_DT>>/g, dateinDDMMYYYY($scope.dtToDate));
				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);

				pdfdd = JSON.parse(mydoc);

				var accHdrLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[0]);
				var coHdrsLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1]);
				var tranLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[2]);
				var totLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[3]);
				var blankLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[4]);

				$http.post('/ledgers/ledgerdata', dataOptions).then(function(response) {
					var trandata = response.data ;
//					console.log(trandata);
					var isPrintTotLine = false ;
					var curAcCode = " " ; 
					var balAmount = 0 ;
					var debitTotal = 0 ;
					var creditTotal = 0 ;
					for(var i=0; i < trandata.length ; i++){
						if(curAcCode != trandata[i].AC_CODE ) {
							//Add Account name line
							balAmount = trandata[i].BAL_AMT ;

							debitTotal = 0 ;
							creditTotal = 0 ;

							var dataln = ' ' ;				
							var dataln = accHdrLine.replace('<<AC_CODE>>', trandata[i].AC_CODE) ;
							dataln = dataln.replace('<<AC_NAME>>', trandata[i].AC_NAME ) ;
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));

							//Add Col Header line
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(coHdrsLine));
						}	

						//Add Data line
						balAmount = balAmount + trandata[i].BILL_AMOUNT - trandata[i].RCPT_AMOUNT ;

						var dataln = tranLine.replace('<<TRAN_DT>>', trandata[i].TRAN_DT) ;
						dataln = dataln.replace('<<NO>>', ' ') ;
						dataln = dataln.replace('<<PARTICULARS>>', trandata[i].TRAN) ;
						dataln = dataln.replace('<<BILL_AMT>>', trandata[i].BILL_AMOUNT) ;
						dataln = dataln.replace('<<RCPT_AMT>>', trandata[i].RCPT_AMOUNT) ;
						dataln = dataln.replace('<<BAL_AMT>>', balAmount) ;
						pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));


						debitTotal = debitTotal + trandata[i].BILL_AMOUNT ;
						creditTotal = creditTotal + trandata[i].RCPT_AMOUNT ;

						curAcCode = trandata[i].AC_CODE ; 
 
						//Add Total line
						isPrintTotLine = false ;
						if( i+1 == trandata.length) {
							isPrintTotLine = true ;
						} else {
//							console.log(curAcCode + " <> " + trandata[i+1].AC_CODE ) ;
							if(curAcCode != trandata[i+1].AC_CODE) {
								isPrintTotLine = true ;
							}
						}
//						console.log()	

						if(isPrintTotLine == true ) {
							//Add Total line
							var dataln = totLine.replace('<<BILLAMT_TOT>>', debitTotal) ;
							dataln = dataln.replace('<<RCPTAMT_TOT>>', creditTotal) ;
							dataln = dataln.replace('<<BALAMT_TOT>>', balAmount) ;
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(blankLine));
						}

					}

					pdfdd.content[0].table.body[2][0].table.body.splice(3,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(2,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(1,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(0,1);
						
					pdfMake.createPdf(pdfdd).open({}, win);

				});
			}
		});
	} else {
		alert("No group selected for printing !!") ;
		$scope.rtnMessage = "No groups selected !!" ;
		$scope.isRtnMsgErr = "Yes" ;		
	}
}

}]); //End of controller : BillRegCntrl






FeesApp.controller('rcptregCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Receipt register" 
	$scope.sortColumn = 'CO_CODE';
	$scope.sortReverse = false;
//	$scope.searchQury = '{CO_CODE: search.CO_CODE, COMPANY: search.COMPANY}';
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;

	var refresh = function() {
	  $http.get('../groups/listall').then(function(response) { 
	    $scope.grouplist = response.data;
	  });

	  $http.get('../billreg/CurrentYearData').then(function(response) {
		$scope.dtFromDate = new Date(response.data.FROM_DT) ;
		$scope.dtToDate = new Date(response.data.TO_DT) ;
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();



$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}

$scope.PrintRcptReport = function PrintRcptReport() {
	var processreport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA"}' ) ;

	if ($scope.ReportOption == 2) {
		var selgroupstring = "(" ;
		for(var i=0; i < $scope.grouplist.length ; i++){
		    if($scope.grouplist[i].CHECKED ){
		    	selgroupstring = selgroupstring + "'" + $scope.grouplist[i].GRP_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selgroupstring = selgroupstring.substr(0, selgroupstring.length - 1) + ")";
		}  else {
			selgroupstring = "( 'NA' )";
		}
		dataOptions.datascope = 2  ; 
		dataOptions.grouplist = selgroupstring ;
	} 

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		var win = window.open('', '_blank');
		var pdfdd = {} ;

		$http.get('../bills/CurrentCoData').then(function(response) {
			if (!response.data.CO_CODE) {
			  	$scope.isIncorrectGroup = true;
			 } else {
				dataOptions.CO_CODE = response.data.CO_CODE ;
				dataOptions.CO_NAME = response.data.COMPANY ;
				dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
				dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;
				dataOptions.RcptOption = $scope.RcptOption ;

				$http.post('/rcptreg/rcptregdata', dataOptions ).then(function(response) {
				  	if (!response.data) {
				  		//$scope.isIncorrectGroup = true;
				  		//show error
				  	} else {
				  		var rcptdata = response.data ;
						var mydoc = JSON.stringify(ddrcptReg) ;
						var todaysDt = appToday() ;

						mydoc = mydoc.replace(/<<CO_NAME>>/g, dataOptions.CO_NAME);
						mydoc = mydoc.replace(/<<FROM_DT>>/g, strDateDDMMYYYY(dataOptions.FROM_DT));
						mydoc = mydoc.replace(/<<TO_DT>>/g, strDateDDMMYYYY(dataOptions.TO_DT));
						mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);
						pdfdd = JSON.parse(mydoc);

						var strdataline = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[0]);			
						var strTotline = JSON.stringify(pdfdd.content[0].table.body[3][0].table.body[1]);

						var billTot = 0 ;
						var cashTot = 0 ;
						var chqTot = 0 ;
						var rcptTot = 0 ;

				    	for(var i=0; i < rcptdata.length ; i++){
				    		var strline = " " ;
					    	strline =  strdataline.replace('<<PARTY_NAME>>', rcptdata[i].AC_NAME) ;
					    	strline =  strline.replace('<<BILL>>', rcptdata[i].BILL_NO) ;
					    	strline =  strline.replace('<<BILL_AMT>>', numberWithCommas(rcptdata[i].TOT_AMT)) ;
					    	strline =  strline.replace('<<RCPT_DT>>', strDateDDMMYYYY(rcptdata[i].RCPT_DATE)) ;
					    	strline =  strline.replace('<<CASH_AMT>>', numberWithCommas(rcptdata[i].CASH1)) ;
					    	strline =  strline.replace('<<CHQ_AMT>>', numberWithCommas(rcptdata[i].CHEQUE1)) ;
					    	strline =  strline.replace('<<RCPT_AMT>>', numberWithCommas(rcptdata[i].RCPT_AMOUNT)) ;

							billTot = billTot + rcptdata[i].TOT_AMT ;
							cashTot = cashTot + rcptdata[i].CASH1 ;
							chqTot = chqTot + rcptdata[i].CHEQUE1 ;
							rcptTot = rcptTot + rcptdata[i].RCPT_AMOUNT ;

					    	var newbilline = JSON.parse(strline);
					    	pdfdd.content[0].table.body[3][0].table.body.push(newbilline);
				    	}

				    	//Add totoal line for last group	
					    var strline =  strTotline.replace('<<BILL_TOT>>', numberWithCommas(billTot)) ;
					    var strline =  strline.replace('<<CASH_TOT>>', numberWithCommas(cashTot)) ;
					    var strline =  strline.replace('<<CHQ_TOT>>', numberWithCommas(chqTot)) ;
					    var strline =  strline.replace('<<RCPT_TOT>>', numberWithCommas(rcptTot)) ;

						var newbilline = JSON.parse(strline);
						pdfdd.content[0].table.body[3][0].table.body.push(newbilline);
						pdfdd.content[0].table.body[3][0].table.body.splice(1,1);
						pdfdd.content[0].table.body[3][0].table.body.splice(0,1);
						pdfMake.createPdf(pdfdd).open({}, win);

					}	
				});
			}	
		});

	} else {
		alert("No group selected for printing !!") ;
		$scope.rtnMessage = "No groups selected !!" ;
		$scope.isRtnMsgErr = "Yes" ;
	}
}


//=============================================
// List order by
//============================================
	$scope.orderByMe = function(x) {
    	if ( x === $scope.sortColumn ) {
    		$scope.sortReverse = $scope.sortReverse ? false : true;
    	} else {
    		$scope.sortColumn = x;	
    		$scope.sortReverse = false;
    	}
  	}

}]); //End of controller : UserListCntrl






FeesApp.controller('TallyExportCntrl', ['$scope', '$http',  '$location',  function($scope, $http,  $location ) {
	$scope.pagetitle = "Export to Tally" 
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.selectedComp = {} ;
	$scope.tallyconfig = {} ;

	$scope.tallyconfig.TALLYSERVER = " " ;
	$scope.tallyconfig.TALLYEXPORTPARTYOPTION = 1 ;
	$scope.tallyconfig.TALLYLEDGER = "Not Available" ;
	$scope.tallyconfig.isReExport = false ;

	$scope.pageDataLoaded  = false ;

	var refresh = function() {
	  $http.get('../Parties/listall').then(function(response) { 
	    $scope.partylist = response.data;
	  	$scope.pageDataLoaded  = true ;
	  });

	  $http.get('../billreg/CurrentYearData').then(function(response) {
		$scope.dtFromDate = new Date(response.data.FROM_DT) ;
		$scope.dtToDate = new Date(response.data.TO_DT) ;
	  });

	  $http.get('/tallyexport/TallyConfig').then(function(response) {
		for(var i=0; i < response.data.length ; i++){
		    if(response.data[i].config_field == "TALLYSERVER" ){
				$scope.tallyconfig.TALLYSERVER = response.data[i].config_value_str ;
				//console.log()
		  	}

		    if(response.data[i].config_field == "TALLYEXPORTPARTYOPTION" ){
				$scope.tallyconfig.TALLYEXPORTPARTYOPTION = response.data[i].config_value_str ;
		  	}

		    if(response.data[i].config_field == "TALLYLEDGER" ){
				$scope.tallyconfig.TALLYLEDGER = response.data[i].config_value_str ;
		  	}

		  }
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};
	refresh();


$scope.ExportCancel = function ExportCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}



$scope.ExportTallyData = function ExportTallyData() {
	var processExport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"TALLYSERVER" : " ", "exportscope" : 1, "reExport" : false , "FROM_DT" : "", "TO_DT" : "",  "grouplist" : "NA", "partylist" : "NA"}' ) ;


	dataOptions.exportscope = $scope.ExportOption  ; 

	if ($scope.ExportOption == 2) {
		var selpartystring = "(" ;
		for(var i=0; i < $scope.partylist.length ; i++){
		    if($scope.partylist[i].CHECKED ){
		    	selpartystring = selpartystring + "'" + $scope.partylist[i].AC_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selpartystring = selpartystring.substr(0, selpartystring.length - 1) + ")";
		}  else {
			selpartystring = "( 'NA' )";
		}
		dataOptions.exportscope = 2  ; 
		dataOptions.partylist = selpartystring ;
	} 


	if($scope.ExportOption == 2 && selectioncount == 0 ) {
		processExport = false ;
	}

	dataOptions.TALLYSERVER =  $scope.tallyconfig.TALLYSERVER ;
	dataOptions.reExport =  $scope.tallyconfig.isReExport ;
	dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
	dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;


	//Save the Tally sever value
	$http.post('/tallyexport/UpdateTServer', dataOptions).then(function(response) {
		//now get data for Exporting Receipts
		if($scope.ExportOption == 1) {
			$http.post('/tallyexport/SendtoTally', dataOptions).then(function(response) {
				$scope.rtnMessage = response.data.message ;
				$scope.isRtnMsgErr = response.data.error ;

				ShowSnackbar($scope.rtnMessage , 0) ;
			});
		} else {
			if(processExport) { 
				$http.post('/tallyexport/SendCCtoTally', dataOptions).then(function(response) {
				  	$scope.rtnMessage = response.data.message ;
				  	$scope.isRtnMsgErr = response.data.error ;

				  	ShowSnackbar($scope.rtnMessage , 0) ;
				});	
			}	
		}
	});

}



$scope.tobedeleted = function tobedeleted() {

	var processexport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA"}' ) ;




	if ($scope.ReportOption == 2) {
		var selLedstr = "(" ;
		for(var i=0; i < $scope.partylist.length ; i++){
		    if($scope.partylist[i].CHECKED ){
		    	selLedstr = selLedstr + "'" + $scope.partylist[i].AC_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selLedstr = selLedstr.substr(0, selLedstr.length - 1) + ")";
		}  else {
			selLedstr = "( 'NA' )";
		}
		dataOptions.datascope = 2  ; 
		dataOptions.partylist = selLedstr ;
	} 

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		var win = window.open('', '_blank');
		var pdfdd = {} ;
		var paramdata = {} ; 
		var mydoc = JSON.stringify(ddLedger) ;
		pdfdd = JSON.parse(mydoc);

		$http.get('../bills/CurrentCoData').then(function(response) {
			if (!response.data.CO_CODE) {
			  	$scope.isIncorrectGroup = true;
			 } else {
				dataOptions.CO_CODE = response.data.CO_CODE ;
				dataOptions.CO_NAME = response.data.COMPANY ;
				dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
				dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;

				var todaysDt = appToday() ;

				mydoc = mydoc.replace(/<<CO_NAME>>/g, dataOptions.CO_NAME);
				mydoc = mydoc.replace(/<<FROM_DT>>/g, dateinDDMMYYYY($scope.dtFromDate));
				mydoc = mydoc.replace(/<<TO_DT>>/g, dateinDDMMYYYY($scope.dtToDate));
				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);

				pdfdd = JSON.parse(mydoc);

				var accHdrLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[0]);
				var coHdrsLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1]);
				var tranLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[2]);
				var totLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[3]);
				var blankLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[4]);

				$http.post('/ledgers/ledgerdata', dataOptions).then(function(response) {
					var trandata = response.data ;
//					console.log(trandata);
					var isPrintTotLine = false ;
					var curAcCode = " " ; 
					var balAmount = 0 ;
					var debitTotal = 0 ;
					var creditTotal = 0 ;
					for(var i=0; i < trandata.length ; i++){
						if(curAcCode != trandata[i].AC_CODE ) {
							//Add Account name line
							balAmount = trandata[i].BAL_AMT ;

							debitTotal = 0 ;
							creditTotal = 0 ;

							var dataln = ' ' ;				
							var dataln = accHdrLine.replace('<<AC_CODE>>', trandata[i].AC_CODE) ;
							dataln = dataln.replace('<<AC_NAME>>', trandata[i].AC_NAME ) ;
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));

							//Add Col Header line
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(coHdrsLine));
						}	

						//Add Data line
						balAmount = balAmount + trandata[i].BILL_AMOUNT - trandata[i].RCPT_AMOUNT ;

						var dataln = tranLine.replace('<<TRAN_DT>>', trandata[i].TRAN_DT) ;
						dataln = dataln.replace('<<NO>>', ' ') ;
						dataln = dataln.replace('<<PARTICULARS>>', trandata[i].TRAN) ;
						dataln = dataln.replace('<<BILL_AMT>>', trandata[i].BILL_AMOUNT) ;
						dataln = dataln.replace('<<RCPT_AMT>>', trandata[i].RCPT_AMOUNT) ;
						dataln = dataln.replace('<<BAL_AMT>>', balAmount) ;
						pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));


						debitTotal = debitTotal + trandata[i].BILL_AMOUNT ;
						creditTotal = creditTotal + trandata[i].RCPT_AMOUNT ;

						curAcCode = trandata[i].AC_CODE ; 
 
						//Add Total line
						isPrintTotLine = false ;
						if( i+1 == trandata.length) {
							isPrintTotLine = true ;
						} else {
//							console.log(curAcCode + " <> " + trandata[i+1].AC_CODE ) ;
							if(curAcCode != trandata[i+1].AC_CODE) {
								isPrintTotLine = true ;
							}
						}
//						console.log()	

						if(isPrintTotLine == true ) {
							//Add Total line
							var dataln = totLine.replace('<<BILLAMT_TOT>>', debitTotal) ;
							dataln = dataln.replace('<<RCPTAMT_TOT>>', creditTotal) ;
							dataln = dataln.replace('<<BALAMT_TOT>>', balAmount) ;
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(blankLine));
						}

					}

					pdfdd.content[0].table.body[2][0].table.body.splice(3,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(2,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(1,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(0,1);
						
					pdfMake.createPdf(pdfdd).open({}, win);

				});
			}
		});
	} else {
		alert("No group selected for printing !!") ;
		$scope.rtnMessage = "No groups selected !!" ;
		$scope.isRtnMsgErr = "Yes" ;		
	}
}

}]); //End of controller : TallyExportCntrl








FeesApp.controller('LedgerCntrl', ['$scope', '$http', '$rootScope', '$location',  function($scope, $http, $rootScope , $location ) {
	$scope.pagetitle = "Ledgers" 
	$scope.rtnMessage = "" ;
	$scope.isRtnMsgErr = "" ; //Yes No values
	$scope.rtnMessageColor = "alert alert-success" ;
	$scope.selectedComp = {} ;

	var refresh = function() {
	  $http.get('../Parties/listall').then(function(response) { 
	    $scope.partylist = response.data;
	  });

	  $http.get('../billreg/CurrentYearData').then(function(response) {
		$scope.dtFromDate = new Date(response.data.FROM_DT) ;
		$scope.dtToDate = new Date(response.data.TO_DT) ;
	  });

	  $scope.rtnMessageColor = (($scope.isRtnMsgErr == "Yes") ? "alert alert-danger" : "alert alert-success") ;
	};

	refresh();


//=================================================================================================
// Print ledger
// Help : http://pdfmake.org/#/
//===============================================================================================

$scope.PrintCancel = function PrintCancel() {
	var approotpath = $location.protocol() + "://" + $location.host() + ":" + $location.port()
	console.log(approotpath);
	window.open(approotpath,"_self");
}


$scope.PrintLedger = function PrintLedger() {
	var processreport = true ;
	var selectioncount = 0 ;
	var dataOptions = JSON.parse('{"datascope" : 1, "grouplist" : "NA", "partylist" : "NA"}' ) ;

	if ($scope.ReportOption == 2) {
		var selLedstr = "(" ;
		for(var i=0; i < $scope.partylist.length ; i++){
		    if($scope.partylist[i].CHECKED ){
		    	selLedstr = selLedstr + "'" + $scope.partylist[i].AC_CODE + "'," ;
		    	selectioncount = selectioncount + 1 ;
		  	}
		  }
		if (selectioncount > 0) {
			selLedstr = selLedstr.substr(0, selLedstr.length - 1) + ")";
		}  else {
			selLedstr = "( 'NA' )";
		}
		dataOptions.datascope = 2  ; 
		dataOptions.partylist = selLedstr ;
	} 

	if($scope.ReportOption == 2 && selectioncount == 0 ) {
		processreport = false ;
	}

	if (processreport) {
		var win = window.open('', '_blank');
		var pdfdd = {} ;
		var paramdata = {} ; 
		var mydoc = JSON.stringify(ddLedger) ;
		pdfdd = JSON.parse(mydoc);

		$http.get('../bills/CurrentCoData').then(function(response) {
			if (!response.data.CO_CODE) {
			  	$scope.isIncorrectGroup = true;
			 } else {
				dataOptions.CO_CODE = response.data.CO_CODE ;
				dataOptions.CO_NAME = response.data.COMPANY ;
				dataOptions.FROM_DT = dateinYYYYMMDD($scope.dtFromDate) ;
				dataOptions.TO_DT = dateinYYYYMMDD($scope.dtToDate) ;

				var todaysDt = appToday() ;

				mydoc = mydoc.replace(/<<CO_NAME>>/g, dataOptions.CO_NAME);
				mydoc = mydoc.replace(/<<FROM_DT>>/g, dateinDDMMYYYY($scope.dtFromDate));
				mydoc = mydoc.replace(/<<TO_DT>>/g, dateinDDMMYYYY($scope.dtToDate));
				mydoc = mydoc.replace(/<<PRINT_DT>>/g, todaysDt);

				pdfdd = JSON.parse(mydoc);

				var accHdrLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[0]);
				var coHdrsLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[1]);
				var tranLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[2]);
				var totLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[3]);
				var blankLine = JSON.stringify(pdfdd.content[0].table.body[2][0].table.body[4]);

				$http.post('/ledgers/ledgerdata', dataOptions).then(function(response) {
					var trandata = response.data ;
//					console.log(trandata);
					var isPrintTotLine = false ;
					var curAcCode = " " ; 
					var balAmount = 0 ;
					var debitTotal = 0 ;
					var creditTotal = 0 ;
					for(var i=0; i < trandata.length ; i++){
						if(curAcCode != trandata[i].AC_CODE ) {
							//Add Account name line
							balAmount = trandata[i].BAL_AMT ;

							debitTotal = 0 ;
							creditTotal = 0 ;

							var dataln = ' ' ;				
							var dataln = accHdrLine.replace('<<AC_CODE>>', trandata[i].AC_CODE) ;
							dataln = dataln.replace('<<AC_NAME>>', trandata[i].AC_NAME ) ;
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));

							//Add Col Header line
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(coHdrsLine));
						}	

						//Add Data line
						balAmount = balAmount + trandata[i].BILL_AMOUNT - trandata[i].RCPT_AMOUNT ;

						var dataln = tranLine.replace('<<TRAN_DT>>', trandata[i].TRAN_DT) ;
						dataln = dataln.replace('<<NO>>', ' ') ;
						dataln = dataln.replace('<<PARTICULARS>>', trandata[i].TRAN) ;
						dataln = dataln.replace('<<BILL_AMT>>', trandata[i].BILL_AMOUNT) ;
						dataln = dataln.replace('<<RCPT_AMT>>', trandata[i].RCPT_AMOUNT) ;
						dataln = dataln.replace('<<BAL_AMT>>', balAmount) ;
						pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));


						debitTotal = debitTotal + trandata[i].BILL_AMOUNT ;
						creditTotal = creditTotal + trandata[i].RCPT_AMOUNT ;

						curAcCode = trandata[i].AC_CODE ; 
 
						//Add Total line
						isPrintTotLine = false ;
						if( i+1 == trandata.length) {
							isPrintTotLine = true ;
						} else {
//							console.log(curAcCode + " <> " + trandata[i+1].AC_CODE ) ;
							if(curAcCode != trandata[i+1].AC_CODE) {
								isPrintTotLine = true ;
							}
						}
//						console.log()	

						if(isPrintTotLine == true ) {
							//Add Total line
							var dataln = totLine.replace('<<BILLAMT_TOT>>', debitTotal) ;
							dataln = dataln.replace('<<RCPTAMT_TOT>>', creditTotal) ;
							dataln = dataln.replace('<<BALAMT_TOT>>', balAmount) ;
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(dataln));
							pdfdd.content[0].table.body[2][0].table.body.push(JSON.parse(blankLine));
						}

					}

					pdfdd.content[0].table.body[2][0].table.body.splice(3,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(2,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(1,1);
					pdfdd.content[0].table.body[2][0].table.body.splice(0,1);
						
					pdfMake.createPdf(pdfdd).open({}, win);

				});
			}
		});
	} else {
		alert("No group selected for printing !!") ;
		$scope.rtnMessage = "No groups selected !!" ;
		$scope.isRtnMsgErr = "Yes" ;		
	}
}

}]); //End of controller : BillRegCntrl





FeesApp.controller('navBarCntrl', ['$scope', '$http', function($scope, $http  ) {


}]);

FeesApp.controller('navMenuCntrl', ['$scope', '$http', function($scope, $http  ) {


}]);


