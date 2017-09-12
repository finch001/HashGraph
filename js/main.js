var md = forge.md.sha256.create();


function calcuteHash(label, x, y, id) {
  var value = label + x + y + id;
  md.update(value);
  var hashcode = md.digest().toHex();
  return hashcode;
}

function calcuteHeader(firstHash, lastHash) {
  var value = firstHash + lastHash;
  
  md.update(value);
  var hashcode = md.digest().toHex();
  return hashcode;
}

function generateRandomStr() {
  var str = "hello world";
  var randomStr = str + Math.round(Math.random() * 10);
  md.update(randomStr);
  var randomHash = md.digest().toHex();
  return randomHash;
}


(function () {
  var data = {
    "source": {
      "nodes": [{
        "shape": "rect",
        "label": "Merkle Tree Root\nHash(H(ab)+H(cd))",
        "x": 690,
        "y": 160,
        "id": "98dc9864",
        "previousblock": "af2969654c31e936685baddee453305ef111e84b4e79acb63a589f10f5037ccb",
        "nextblock": "992c133693b0fbd11c573339c952aff6abaceed29292e37f67b89580747275e0",
        "merkleroot": "da7d5937e9c142fb42195ea452460f9ae7e20abd3c21acc4fbdddecb0528957e"
      },
        {
          "shape": "rect",
          "label": "Prev Block",
          "x": 540,
          "y": 160,
          "id": "prevnode",
          "nextblock": "da7d5937e9c142fb42195ea452460f9ae7e20abd3c21acc4fbdddecb0528957e",
          "merkleroot": "af2969654c31e936685baddee453305ef111e84b4e79acb63a589f10f5037ccb"
        },
        {
          "shape": "rect",
          "label": "Next Block",
          "x": 840,
          "y": 160,
          "id": "nextnode",
          "previousblock": "da7d5937e9c142fb42195ea452460f9ae7e20abd3c21acc4fbdddecb0528957e",
          "merkleroot": "992c133693b0fbd11c573339c952aff6abaceed29292e37f67b89580747275e0"
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(ab)",
          "x": 600,
          "y": 260,
          "id": "b930c7c6",
          "merkleroot": ""
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(cd)",
          "x": 780,
          "y": 260,
          "id": "d988ec8a",
          "merkleroot": ""
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(a)",
          "x": 460,
          "y": 400,
          "id": "7aa93fa9",
          "merkleroot": "84a893e0a536ccce896d19ae094864c221a8b4f33469a6c8b4dcbcce30f169ba"
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(b)",
          "x": 600,
          "y": 400,
          "id": "c07cff54",
          "merkleroot": "6b3c8dbc72aa5c88f267dc8cc415af3aeab9f75210683fa07ff0f5e3f73b263f"
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(c)",
          "x": 730,
          "y": 400,
          "id": "c7101ad5",
          "merkleroot": "b83923c98c8f90ff82f2af956c917ff608e47999e834f4b436cd2393bfe79118"
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(d)",
          "x": 870,
          "y": 400,
          "id": "06d54d45",
          "merkleroot": "e9d4244eecf8cd78a988db895aab077c2140b586fcbbe44936cb36a18f208d04"
        },
      ],
      "edges": [{
        "shape": "arrow",
        "source": "7aa93fa9",
        "target": "b930c7c6",
        "id": "eff1ce35",
        },
        {
          "shape": "arrow",
          "source": "c07cff54",
          "target": "b930c7c6",
          "id": "0ab3739e"
        },
        {
          "shape": "arrow",
          "source": "b930c7c6",
          "target": "98dc9864",
          "id": "d584d8d3",
        },
        {
          "shape": "arrow",
          "source": "prevnode",
          "target": "98dc9864",
          "id": "prevline"
        },
        {
          "shape": "arrow",
          "source": "98dc9864",
          "target": "nextnode",
          "id": "nextline"
        },
        {
          "shape": "arrow",
          "source": "d988ec8a",
          "target": "98dc9864",
          "id": "1b1ff4c6",
        },
        {
          "shape": "arrow",
          "source": "c7101ad5",
          "target": "d988ec8a",
          "id": "bcb10fcc",
        },
        {
          "shape": "arrow",
          "source": "06d54d45",
          "target": "d988ec8a",
          "id": "97bcc95e",
        }
      ]
    }
  };
  
  function renderNet() {
    var net = new G6.Net({
      id: 'c1',
      width: 1254,
      fitView: 'autoZoom'
    });
  
    net.tooltip({
      title: 'Hash',
      split: '=>',
      dx: 10,
      dy: 10
    });
    net.read(data);
    net.node().tooltip('merkleroot');
    net.render();
    return net;
  }
  
  var net = renderNet();
  var transNodeList = [];
  var transLineList = [];
  
  function initView() {
    var valueRoot = net._attrs.nodes[0];
    var nodeRoot = net.find(valueRoot.id);
    
    var valueAB = net._attrs.nodes[3];
    var nodeAB = net.find(valueAB.id);
    
    var valueCD = net._attrs.nodes[4];
    var nodeCD = net.find(valueCD.id);
    
    var valueA = net._attrs.nodes[5];
    var nodeA = net.find(valueA.id);
    
    var valueB = net._attrs.nodes[6];
    var nodeB = net.find(valueB.id);
    
    var valueC = net._attrs.nodes[7];
    var nodeC = net.find(valueC.id);
    
    var valueD = net._attrs.nodes[8];
    var nodeD = net.find(valueD.id);
    
    transNodeList.push(nodeAB);
    transNodeList.push(nodeCD);
    transNodeList.push(nodeA);
    transNodeList.push(nodeB);
    transNodeList.push(nodeC);
    transNodeList.push(nodeD);
    
    console.log("line", net._attrs.edges);
    var lineAB_ABCD = net._attrs.edges[2];
    var lineCD_ABCD = net._attrs.edges[5];
    var lineA_AB = net._attrs.edges[0];
    var lineB_AB = net._attrs.edges[1];
    var lineC_CD = net._attrs.edges[6];
    var lineD_CD = net._attrs.edges[7];
    
    transLineList.push(lineAB_ABCD);
    transLineList.push(lineCD_ABCD);
    transLineList.push(lineA_AB);
    transLineList.push(lineB_AB);
    transLineList.push(lineC_CD);
    transLineList.push(lineD_CD);
    
    var hashAB = calcuteHeader(valueA.merkleroot, valueB.merkleroot);
    var hashCD = calcuteHeader(valueC.merkleroot, valueD.merkleroot);
    
    var hashRoot = calcuteHeader(hashAB, hashCD);
    console.log("hashAB", hashAB);
    console.log("hashCD", hashCD);
    console.log("hashABCD", hashRoot);
    var btnFind = $('#findUpdate');
    
    net.update(nodeRoot, {
      merkleroot: hashRoot
    });
    
    net.update(nodeAB, {
      merkleroot: hashAB
    });
    
    net.update(nodeCD, {
      merkleroot: hashCD
    });
    console.log("update hash-------");
    console.log(net._attrs.nodes);
    return btnFind;
  }
  
  var btnFind = initView();
  
  function calculateRoot(){
    var randomStr = generateRandomStr();
    console.log('randomStr', randomStr);
    
    var changeIndex = Math.round(Math.random() * 6);
    console.log('changeIndex', changeIndex);
    
    //var changeNode = transNodeList[changeIndex];
    if(changeIndex >= 0 && changeIndex < 2){
      calculateSecond();
    }else{
      calculateSecond();
      calculateThird();
    }
  }
  
  function calculateSecond() {
    // TODO
    console.log("calculateSecond");
  }
  
  function calculateThird() {
    // TODO
    console.log("calculateThird");
  }
  
  function reRenderView() {
    // TODO
    console.log('reRenderView');
  }
  
  btnFind.on('click', function (ev) {
    calculateRoot();
    reRenderView();
  });
})();
