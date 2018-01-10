javascript: (function(){
	if (typeof jQuery == 'undefined'){
		var script = document.createElement('script');
		script.src = '//code.jquery.com/jquery-latest.min.js';
		script.onload = function(){
			run_bookmarklet();
		};
		document.getElementsByTagName('head')[0].appendChild(script);
	} else {
		run_bookmarklet();
	}
	function run_bookmarklet(){
		if (jQuery('#analysis').length){
			run_analysis();
		}
		else{
			var html_str = [
				'<div class="row-header">',
					'<span class="trn" data-trn-key="analysis">Analysis</span>',
				'</div>',
				'<div class="row-box height7">',
					'<div id="analysis">',
						'<div class="row-box height1" style="">',
							'<table class="table table-condensed table-borderless">',
								'<tbody id="analysis_table_body">',
								'</tbody>',
							'</table>',
							'<span>Need Help? <a href="https://github.com/veerman/EtherDeltaAnalysis" target="_blank">GitHub Project Page</a></span>',
						'</div>',
					'</div>',
				'</div>'
			].join('');
			jQuery('span[data-trn-key="trades"]').closest('div[class="row-container"]').prepend(html_str);
			run_analysis();
			setInterval(function(){ run_analysis(); }, 10000);
		}
	}

	function run_analysis(){
		var token = jQuery('#trades').find('th:nth-child(2)').text();
		var is_sell = true;
		var skip_tr = false;
		var sells = {
			total_orders: 0,
			total_tokens: 0
		};
		var buys = {
			total_orders: 0,
			total_eth: 0
		};
		var last_sell_price = 0;
		var first_buy_price = 0;
		jQuery('#orders tr').each(function(){
			$tr = jQuery(this);
			if ($tr.attr('id') == 'orderBookMid'){
				is_sell = false;
				skip_tr = true;
			}

			$tds = jQuery($tr).find('td');
			if (is_sell){
				num_str = jQuery($tds[1]).text();
				tokens = parseFloat(num_str);
				sells.total_tokens += tokens;
				sells.total_orders++;
				last_sell_price = parseFloat(jQuery($tds[0]).text());
			}else{
				if (skip_tr){
					skip_tr = false;
				}
				else{
					num_str = jQuery($tds[2]).text();
					eth = parseFloat(num_str);
					buys.total_eth += eth;
					buys.total_orders++;
					if (first_buy_price === 0){
						first_buy_price = parseFloat(jQuery($tds[0]).text());
					}
				}
			}
		});

		var analysis_info = {};
		analysis_info["Sell Orders"] = sells.total_orders.toLocaleString();
		analysis_info["Buy Orders"] = buys.total_orders.toLocaleString();
		analysis_info["Cheapest Sell Price"] = Number(last_sell_price).toFixed(16).replace(/\.?0+$/,"").toLocaleString();
		analysis_info["Largest Buy Price"] = Number(first_buy_price).toFixed(16).replace(/\.?0+$/,"").toLocaleString();
		analysis_info["Total " + token + " Listed (Sell)"] = sells.total_tokens.toLocaleString();
		analysis_info["Total ETH Committed (Buy)"] = buys.total_eth.toLocaleString();
		analysis_info["Average " + token + "s per 1 ETH"] = (sells.total_tokens/buys.total_eth).toLocaleString();
		analysis_info["Average ETHs per 1 " + token] = Number(buys.total_eth/sells.total_tokens).toFixed(16).replace(/\.?0+$/,"").toLocaleString();
		analysis_info["Cheapest Sell Price vs Avg ETHs/" + token] = (last_sell_price / Number(buys.total_eth/sells.total_tokens).toFixed(16).replace(/\.?0+$/,"")).toLocaleString() + ' x';

		var html_str = '';
		Object.keys(analysis_info).forEach(function(key){
			html_str += [
				'<tr>',
					'<td style="text-align:left">',
						'<span>' + key + '</span>',
					'</td>',
					'<td style="text-align:left">',
						'<span class="text">' + analysis_info[key] + '</span>',
					'</td>',
				'</tr>'
			].join('');
		});

		jQuery('#analysis_table_body').html(html_str);
	}
})();
