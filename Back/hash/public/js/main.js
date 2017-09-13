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

$(document).ready(function () {
  $('#fullpage').fullpage();
});

(function () {
  var data = {
    "source": {
      "nodes": [{
          "shape": "rect",
          "label": "Merkle Tree Root\nHash(H(ab)+H(cd))\nValue:28957e",
          "x": 690,
          "y": 160,
          "id": "98dc9864",
          "previousblock": "af2969654c31e936685baddee453305ef111e84b4e79acb63a589f10f5037ccb",
          "nextblock": "992c133693b0fbd11c573339c952aff6abaceed29292e37f67b89580747275e0",
          "merkleroot": "da7d5937e9c142fb42195ea452460f9ae7e20abd3c21acc4fbdddecb0528957e",
          "changeHash": ""
        },
        {
          "shape": "rect",
          "label": "Prev Block",
          "x": 540,
          "y": 160,
          "id": "prevnode",
          "nextblock": "da7d5937e9c142fb42195ea452460f9ae7e20abd3c21acc4fbdddecb0528957e",
          "merkleroot": "af2969654c31e936685baddee453305ef111e84b4e79acb63a589f10f5037ccb",
          "changeHash": ""
        },
        {
          "shape": "rect",
          "label": "Next Block",
          "x": 840,
          "y": 160,
          "id": "nextnode",
          "previousblock": "da7d5937e9c142fb42195ea452460f9ae7e20abd3c21acc4fbdddecb0528957e",
          "merkleroot": "992c133693b0fbd11c573339c952aff6abaceed29292e37f67b89580747275e0",
          "changeHash": ""
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(ab)\nValue:90a316",
          "x": 600,
          "y": 260,
          "id": "b930c7c6",
          "merkleroot": "35418ff7ad0a28f9ae458a819e0acdecf50a33b9fde10dbfccd9523e5590a316",
          "changeHash": ""
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(cd)\nValue:2b6930",
          "x": 780,
          "y": 260,
          "id": "d988ec8a",
          "merkleroot": "de4261038f1d947490efb097845ca57e98ebe7d03f50319f9d2ae2a2d72b6930",
          "changeHash": ""
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(a)\nValue:f169ba",
          "x": 460,
          "y": 400,
          "id": "7aa93fa9",
          "merkleroot": "84a893e0a536ccce896d19ae094864c221a8b4f33469a6c8b4dcbcce30f169ba",
          "changeHash": ""
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(b)\nValue:3b263f",
          "x": 600,
          "y": 400,
          "id": "c07cff54",
          "merkleroot": "6b3c8dbc72aa5c88f267dc8cc415af3aeab9f75210683fa07ff0f5e3f73b263f",
          "changeHash": ""
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(c)\nValue:e79118",
          "x": 730,
          "y": 400,
          "id": "c7101ad5",
          "merkleroot": "b83923c98c8f90ff82f2af956c917ff608e47999e834f4b436cd2393bfe79118",
          "changeHash": ""
        },
        {
          "shape": "rect",
          "label": "Transaction\nHash(d)\nValue:208d04",
          "x": 870,
          "y": 400,
          "id": "06d54d45",
          "merkleroot": "e9d4244eecf8cd78a988db895aab077c2140b586fcbbe44936cb36a18f208d04",
          "changeHash": ""
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
      width: 1259,
      fitView: 'autoZoom',
    });

    // net.tooltip({
    //   title: 'Hash',
    //   split: '=>',
    //   dx: 10,
    //   dy: 10
    // });
    net.read(data);
    // net.node().tooltip('label');
    net.render();
    return net;
  }

  var net = renderNet();
  var transNodeList = [];
  var transLineList = [];

  var changeNodeList = [];
  var changeLineList = [];

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

  var lineAB_ABCD = net._attrs.edges[2];
  var lineCD_ABCD = net._attrs.edges[5];
  var lineA_AB = net._attrs.edges[0];
  var lineB_AB = net._attrs.edges[1];
  var lineC_CD = net._attrs.edges[6];
  var lineD_CD = net._attrs.edges[7];

  var prevNode = net.find('prevnode');
  console.log(prevNode);
  var nextNode = net.find('nextnode');
  console.log(nextNode);

  function initView() {
    transNodeList.push(nodeAB);
    transNodeList.push(nodeCD);
    transNodeList.push(nodeA);
    transNodeList.push(nodeB);
    transNodeList.push(nodeC);
    transNodeList.push(nodeD);

    transLineList.push(lineAB_ABCD);
    transLineList.push(lineCD_ABCD);
    transLineList.push(lineA_AB);
    transLineList.push(lineB_AB);
    transLineList.push(lineC_CD);
    transLineList.push(lineD_CD);

    console.log("line", net._attrs.edges);

    var hashAB = calcuteHeader(valueA.merkleroot, valueB.merkleroot);
    var hashCD = calcuteHeader(valueC.merkleroot, valueD.merkleroot);
    var hashRoot = calcuteHeader(hashAB, hashCD);

    net.update(nodeAB, {
      merkleroot: hashAB
    });

    net.update(nodeCD, {
      merkleroot: hashCD
    });

    //net.update()
    console.log("hashAB", hashAB);
    console.log("hashCD", hashCD);
    console.log("hashABCD", hashRoot);

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
  }

  var changeIndex = 0;

  function calculateRoot() {
    changeLineList.splice(0, changeLineList.length);
    changeNodeList.splice(0, changeNodeList.length);

    var randomStr = generateRandomStr();
    console.log('randomStr', randomStr);

    changeIndex = Math.round(Math.random() * 3);
    console.log('changeIndex', changeIndex);

    switch (changeIndex) {
      case 0:
        {
          changeLineList.push(lineA_AB);
          changeLineList.push(lineAB_ABCD);

          changeNodeList.push(nodeA);
          changeNodeList.push(nodeAB);
          changeNodeList.push(nodeRoot);

          net.update(nodeA, {
            changeHash: randomStr
          });
          console.log("calculateStr randomStr", randomStr);
          var old_b_Hash = nodeB._attrs.model.merkleroot;
          var new_ab_hash = calcuteHeader(randomStr, old_b_Hash);
          net.update(nodeAB, {
            changeHash: new_ab_hash
          });
          console.log("calculateStr newABhash", new_ab_hash);
          var old_cd_hash = nodeCD._attrs.model.merkleroot;
          var new_root_hash = calcuteHeader(new_ab_hash, old_cd_hash);

          net.update(nodeRoot, {
            changeHash: new_root_hash
          });
          console.log("calculateStr newRootHash", new_root_hash);
          break;
        }

      case 1:
        {
          changeLineList.push(lineB_AB);
          changeLineList.push(lineAB_ABCD);

          changeNodeList.push(nodeB);
          changeNodeList.push(nodeAB);
          changeNodeList.push(nodeRoot);


          net.update(nodeB, {
            changeHash: randomStr
          });
          console.log("calculateStr randomStr", randomStr);
          var old_a_hash = nodeA._attrs.model.merkleroot;
          var new_ab_hash = calcuteHeader(old_a_hash, randomStr);

          net.update(nodeAB, {
            changeHash: new_ab_hash
          });
          console.log("calculateStr new_ab_hash", new_ab_hash);
          var old_cd_hash = nodeCD._attrs.model.merkleroot;
          var new_root_hash = calcuteHeader(new_ab_hash, old_cd_hash);

          net.update(nodeRoot, {
            changeHash: new_root_hash
          });
          console.log("calculateStr new_root_hash", new_root_hash);
          break;
        }

      case 2:
        {
          changeLineList.push(lineC_CD);
          changeLineList.push(lineCD_ABCD);

          changeNodeList.push(nodeC);
          changeNodeList.push(nodeCD);
          changeNodeList.push(nodeRoot);

          net.update(nodeC, {
            changeHash: randomStr
          });
          console.log("calculateStr randomStr", randomStr);
          var old_d_hash = nodeD._attrs.model.merkleroot;
          var new_cd_hash = calcuteHeader(randomStr, old_d_hash);

          net.update(nodeCD, {
            changeHash: new_cd_hash
          });
          console.log("calculateStr new_cd_hash", new_cd_hash);
          var old_ab_hash = nodeAB._attrs.model.merkleroot;
          var new_root_hash = calcuteHeader(old_ab_hash, new_cd_hash);

          net.update(nodeRoot, {
            changeHash: new_root_hash
          });
          console.log("calculateStr new_root_hash", new_root_hash);
          break;
        }
      case 3:
        {
          changeLineList.push(lineD_CD);
          changeLineList.push(lineCD_ABCD);

          changeNodeList.push(nodeD);
          changeNodeList.push(nodeCD);
          changeNodeList.push(nodeRoot);

          net.update(nodeD, {
            changeHash: randomStr
          });
          console.log("calculateStr randomStr", randomStr);
          var old_c_hash = nodeC._attrs.model.merkleroot;
          var new_cd_hash = calcuteHeader(old_c_hash, randomStr);
          net.update(nodeCD, {
            changeHash: new_cd_hash
          });
          console.log("calculateStr new_cd_hash", new_cd_hash);
          var old_ab_hash = nodeAB._attrs.model.merkleroot;
          var new_root_hash = calcuteHeader(old_ab_hash, new_cd_hash);

          net.update(nodeRoot, {
            changeHash: new_root_hash
          });
          console.log("calculateStr new_root_hash", new_root_hash);
          break;
        }
      default:
    }
  }

  // 需要修改的节点和连线
  function reRenderView(changeNodeList) {
    var delay = 0;
    for (var i = 0; i < changeNodeList.length; i++) {
      delay += 250;
      (function (i) {
        setTimeout(function () {
          renderItem(changeNodeList[i]);
        }, delay);
      })(i);
    }

    net.refresh();
    console.log('reRenderView');
  }

  function renderItem(node) {
    var nodeValue = node._attrs.model;
    var labelValue = nodeValue.label;
    var changeHash = nodeValue.changeHash;

    var labelIndex = labelValue.indexOf(':');
    var labelStr = labelValue.slice(0, labelIndex + 1);
    var hashStr = changeHash.slice(changeHash.length - 6, changeHash.length);

    var resultStr = labelStr + hashStr;
    console.log("renderItem", resultStr);
    net.update(node, {
      color: 'red',
      label: resultStr
    });
  }

  function resetAllView() {
    for (var i = 0; i < net._attrs.nodes.length; i++) {
      if(i == 1 || i == 2){
        continue;
      }
      var item = net._attrs.nodes[i];
      var labelIndex = item.label.indexOf(':');
      var labelStr = item.label.slice(0, labelIndex + 1);
      var hash = item.merkleroot.slice(item.merkleroot.length -6, item.merkleroot.length);

      var label = labelStr + hash;
      var node = net.find(item.id);
      net.update(node, {
        color: '',
        label: label
      });
    }

    net.refresh();
  }
  var btnFind = $('#findUpdate');
  btnFind.on('click', function (ev) {
    calculateRoot();
    resetAllView();
    reRenderView(changeNodeList);
  });

  var btnReset = $('#reset');

  btnReset.on('click', function (ev) {
    resetAllView();
  });

})();
