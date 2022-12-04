// Docdefinition for single bill

var ddSingleBill = {
//  	pageSize: 'LEGAL',
    pageSize: {width: 590, height: 486 }, //Half of legal paper
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
                                    [{text: '111 - Chartered Accountants', colSpan: 2, border: [false, false, false, false]}, {}, {text:'Tel : <<CO_TEL>>', border: [false, false, false, false]}],
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
                                    [{ text:'<<PARTY_ADD3>>', colSpan: 2 , border: [false, false, false, true]}, {}, {text : 'Party PAN : <<PARTY_PAN>>' , border: [false, false, false, false]}],
                				]
                			}
                		}
					],
					//Section 4
					[
                		{
                			style: 'dtable',
                			table: {
                				widths: [20, 345, 50, 80],
                				headerRows: 1,
                				body: [
                					[{ text:'No', style: 'tableHeader'}, {text:'Particulars', style: 'tableHeader'}, '', {text:'Amount', style: 'tableHeader', alignment: 'right'}],
                					[{ text:'<<LINE>>' , alignment: 'right'}, '<<BILL_TRAN>>', '' ,{text:'<<TRAN_AMT>>', alignment: 'right'}],
                					['', '', '' ,' '],
                                    ['', '', '' ,' '],
                                    ['', '', '' ,' '],
                                    ['', '', '' ,' '],
                                    ['', '', '' ,' '],
                                    ['', '', '' ,' '],
                                    ['', '', '' ,' '],
                                    ['', '', '' ,' '],
                                    ['', '', '' ,' '],
                					[{}, {text:"Please pay by A/c. Payee's Cheque Only."}, {text :'Total :',  alignment: 'right'}, {text:'<<TOT_AMT>>', alignment: 'right', style:'tableHeader'}],
                				]
                			},
                            layout: 'lightHorizontalLines'
                		}
					],
					//Section 5
					[
                		{
                			style: 'dtable',
                			table: {
                				widths: [50, 10, 455],
                				headerRows: 1,
                				body: [
                                    [{text:'E.& O. E.' , border: [false, true, false, false] }, {text:' ' , border: [false, true, false, false]}, {text:'For <<CO_NAME>>,', style: 'tableHeader', alignment: 'right' , border: [false, true, false, false]}],
                                    [{text: ' ', border: [false, false, false, false]}, {text: ' ', border: [false, false, false, false]}, {text: ' ', border: [false, false, false, false]}],
                                    [{text: ' ', border: [false, false, false, true]}, {text: ' ', border: [false, false, false, true]}, {text:'.', style: 'tableHeader', alignment: 'right' , border: [false, false, false, true] }]
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

