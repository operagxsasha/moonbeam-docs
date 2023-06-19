import { ApiPromise, WsProvider } from '@polkadot/api'; // Version 9.13.6
import Keyring from '@polkadot/keyring'; // Version 10.3.1

// 1. Input Data
const providerWsURL = 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network';
const MNEMONIC = 'INSERT_MNEMONIC'; // Not safe, only for testing
const txCall =
  '0xc10a04630003000100a10f031000040000010403000f0000c16ff28623130000010403000f0000c16ff28623000601070053cd200a007d09260001f0490200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008080000000000000000000000000000000000000000000000000000000000000000110896e292b8000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000000020000000000000000000000001fc56b105c4f0a1a8038c2b429932b122f6b631f000000000000000000000000ed13b028697febd70f34cf9a9e280a8f1e98fd29000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000042004ffd90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000042004ffd9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d0100000103000d1587fae4f265b31ea9ba0cfdb1ade1208ed657';

// 2. Create Keyring Instance
const keyring = new Keyring({ type: 'sr25519' });

const sendXCM = async () => {
  // 3. Create Substrate API Provider
  const substrateProvider = new WsProvider(providerWsURL);
  const api = await ApiPromise.create({ provider: substrateProvider });

  // 4. Create Account from Mnemonic
  const alice = keyring.addFromUri(MNEMONIC);

  // 5. Create the Extrinsic
  const tx = await api.tx(txCall).signAndSend(alice, (result) => {
    // 6. Check Transaction Status
    if (result.status.isInBlock) {
      console.log(`Transaction included in blockHash ${result.status.asInBlock}`);
    }
  });

  api.disconnect();
};

sendXCM();
