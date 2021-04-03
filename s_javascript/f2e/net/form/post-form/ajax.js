var AJAXSubmit = (function () {
	function submitData(oData) {
		
	}
	
	
	function processStatus(oData) {
		
	}
	
	function SubmitRequest(oTarget) {
		// 组装数据
		var nFile, sFieldType, oField, oSegmReq, oFile, bIsPost = oTarget.method.toLowerCase() === 'post'
		
		this.contentType = bIsPost && oTarget.enctype ? oTarget.enctype : "application/x-www-form-urlencoded"
		this.receiver = oTarget.action
		this.status = 0
		this.segments = []
		
		for (var nItem = 0; nItem < oTarget.elements.length; nItem++) {
			var nowElem = oTarget.elements[nItem],
				nowType = nowElem.nodeName.toLowerCase() === 'input' ? nowElem.getAttribute('type').toLowerCase() : 'text'
			if (!nowElem.hasAttribute('name')) continue
			
			if (nowType === 'file' && nowElem.files.length > 0) {
				
			} else if ((nowType !== 'radio' && nowType !== 'checkbox') || nowElem.checked) {
				this.segments.push(
					this.technique === 3 ?
						"Content-Disposition:form-data;name=\"" + nowElem.name + "\"\r\n\r\n" + nowElem.value + "\r\n"
						: fFilter(nowElem.name) + "=" + fFilter(oField.value)
				)
			}
		}
		
		
		// 发送请求
		processStatus(this)
	}
	
	return function (oFormElement) {
		if (!oFormElement.action) {
			return
		}
		
		new SubmitRequest(oFormElement)
	}
})();