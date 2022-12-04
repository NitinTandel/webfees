// Docdefinition for single bill

module.exports =  {
  	pageSize: 'A4',
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
								widths: [250, 10, 250],
								headerRows: 1,
								body: [
									[{text: '<<CO_NAME>>', style: 'tableHeader', colSpan: 3, alignment: 'center', border: [false, false, false, false]}, {}, {}],
				                    [{text: '<<CO_ADD>>',  colSpan: 3, alignment: 'center',border: [false, false, false, false]}, {}, {}],
									[{text:'Tel : <<CO_TEL>>', border: [false, false, false, true] }, {text: '', border: [false, false, false, true]}, {text: '<<CO_EMAIL>>', alignment: 'right', border: [false, false, false, true]}],
								]
							}
						}
					],
					//Section 2
					[
                		{
                			style: 'dtable',
                			table: {
                				widths: [250, 10, 250],
                				headerRows: 1,
                				body: [
                					['Bill No : <<BILL_NO>>', '', {text: 'Bill Date : <<BILL_DATE>>', alignment: 'right'}]
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
                				widths: [250, 10, 250],
                				headerRows: 1,
                				body: [
                					[{ text:'Client Name & Address :', style: 'tableHeader', colSpan: 3}, {}, {}],
                					[{ text:'<<PARTY_NM>>', colSpan: 3}, {}, {}],
                					[{ text:'<<PARTY_ADD1>>', colSpan: 3}, {}, {}],
                					[{ text:'<<PARTY_ADD2>>', colSpan: 3}, {}, {}],
                					[{ text:'<<PARTY_ADD3>>', colSpan: 3}, {}, {}],
                				]
                			},
                			layout: 'noBorders'
                		}
					],
					//Section 4
					[
                		{
                			style: 'dtable',
                			table: {
                				widths: [20, 410, 80],
                				headerRows: 1,
                				body: [
                					[{ text:'No', style: 'tableHeader'}, {text:'Particulars', style: 'tableHeader'}, {text:'Amount', style: 'tableHeader', alignment: 'right'}],
                					[{ text:'1' , alignment: 'right'}, '<<BILL_TRAN>>', {text:'<<TRAN_AMT>>', alignment: 'right'}],
                					['', '', ' '],
                					[{ text:'Total :', style: 'tableHeader', colSpan: 2}, {}, {}],
                				]
                			},
                		}
					],
					//Section 5
					[
                		{
                			style: 'dtable',
                			table: {
                				widths: [50, 10, 450],
//                				headerRows: 1,
                				body: [
                					[{text:'E.& O. E. Bank' }, {}, {text:'For <<CO_NAME>>,', style: 'tableHeader', alignment: 'right'}],
                					[{text:'Bank   : ' }, {}, {}],
                					[{text:'A/c No : ' }, {}, {}],
                					[{text:'IFSC   : ' }, {}, {}],
                					[{}, {}, {text:'Prop.', style: 'tableHeader', alignment: 'right' , border: [false, false, false, true]}],
                				]
                			},
                			layout: 'noBorders'
                		}
					],

	                [
                		{
                			style: 'dtable',
                			table: {
                				widths: [520],
                				body: [
                					[{text:'Developed by A. V. Solutions', border: [false, true, false, false] , pageBreak: 'after' }],
                				]
                			}
                		}
	                ]
				]
			},
			layout: 'noBorders'
		}
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
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
			fontSize: 13,
			color: 'black'
		}
	},
	defaultStyle: {
		// alignment: 'justify'
	}	
};


