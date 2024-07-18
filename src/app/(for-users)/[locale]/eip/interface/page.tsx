'use client'
import '../style.css'
export default function ForInterfacePage() {
  return (
    <div className="w-full gap-4 flex flex-col">
      <article className="post">
        <div className="post-content">
          <a href="./" className="text-center">
            <h2>Ethereum Improvement Proposals</h2>
          </a>

          <div className="flex flex-row gap-4 text-xl justify-center my-4">
            <a href="./all">All</a>
            <a href="./core">Core</a>
            <a href="./networking">Networking</a>
            <a href="./interface">Interface</a>
            <a href="./erc">ERC</a>
            <a href="./meta">Meta</a>
            <a href="./informational">Informational</a>
          </div>
          <header className="post-header">
            <h1 className="post-title">Interface</h1>
          </header>
          <h2 id="final">Final</h2>
          <table className="eiptable">
            <thead>
              <tr>
                <th className="eipnum">Number</th>
                <th className="title">Title</th>
                <th className="author">Author</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-6">6</a>
                </td>

                <td className="title">Renaming SUICIDE opcode</td>
                <td className="author">
                  Hudson Jameson&nbsp;&lt;
                  <a href="mailto:hudson@hudsonjameson.com">
                    hudson@hudsonjameson.com
                  </a>
                  &gt;
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-234">234</a>
                </td>

                <td className="title">
                  Add `blockHash` to JSON-RPC filter options.
                </td>
                <td className="author">
                  Micah Zoltu&nbsp;(
                  <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-695">695</a>
                </td>

                <td className="title">
                  Create `eth_chainId` method for JSON-RPC
                </td>
                <td className="author">
                  Isaac Ardis&nbsp;&lt;
                  <a href="mailto:isaac.ardis@gmail.com">
                    isaac.ardis@gmail.com
                  </a>
                  &gt;, Wei Tang&nbsp;(
                  <a href="https://github.com/sorpaas">@sorpaas</a>), Fan
                  Torchz&nbsp;(<a href="https://github.com/tcz001">@tcz001</a>),
                  Erik Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-712">712</a>
                </td>

                <td className="title">
                  Typed structured data hashing and signing
                </td>
                <td className="author">
                  Remco Bloemen&nbsp;(
                  <a href="https://github.com/Recmo">@Recmo</a>), Leonid
                  Logvinov&nbsp;(
                  <a href="https://github.com/LogvinovLeon">@LogvinovLeon</a>),
                  Jacob Evans&nbsp;(<a href="https://github.com/dekz">@dekz</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-747">747</a>
                </td>

                <td className="title">wallet_watchAsset RPC Method</td>
                <td className="author">
                  Dan Finlay&nbsp;(
                  <a href="https://github.com/danfinlay">@danfinlay</a>),
                  Esteban Mino&nbsp;(
                  <a href="https://github.com/estebanmino">@estebanmino</a>),
                  Gavin John&nbsp;(
                  <a href="https://github.com/Pandapip1">@Pandapip1</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1193">1193</a>
                </td>

                <td className="title">Ethereum Provider JavaScript API</td>
                <td className="author">
                  Fabian Vogelsteller&nbsp;(
                  <a href="https://github.com/frozeman">@frozeman</a>), Ryan
                  Ghods&nbsp;(<a href="https://github.com/ryanio">@ryanio</a>),
                  Victor Maia&nbsp;(
                  <a href="https://github.com/MaiaVictor">@MaiaVictor</a>), Marc
                  Garreau&nbsp;(
                  <a href="https://github.com/wolovim">@wolovim</a>), Erik
                  Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2159">2159</a>
                </td>

                <td className="title">
                  Common Prometheus Metrics Names for Clients
                </td>
                <td className="author">
                  Adrian Sutton&nbsp;(
                  <a href="https://github.com/ajsutton">@ajsutton</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2255">2255</a>
                </td>

                <td className="title">Wallet Permissions System</td>
                <td className="author">
                  Dan Finlay&nbsp;(
                  <a href="https://github.com/danfinlay">@danfinlay</a>), Erik
                  Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>), Gavin
                  John&nbsp;(
                  <a href="https://github.com/Pandapip1">@Pandapip1</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2696">2696</a>
                </td>

                <td className="title">
                  JavaScript `request` method RPC transport
                </td>
                <td className="author">
                  Micah Zoltu&nbsp;(
                  <a href="https://github.com/MicahZoltu">@MicahZoltu</a>), Erik
                  Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2700">2700</a>
                </td>

                <td className="title">JavaScript Provider Event Emitter</td>
                <td className="author">
                  Micah Zoltu&nbsp;(
                  <a href="https://github.com/MicahZoltu">@MicahZoltu</a>), Erik
                  Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-4736">4736</a>
                </td>

                <td className="title">Consensus Layer Withdrawal Protection</td>
                <td className="author">
                  Benjamin Chodroff&nbsp;(
                  <a href="https://github.com/benjaminchodroff">
                    @benjaminchodroff
                  </a>
                  ), Jim McDonald&nbsp;(
                  <a href="https://github.com/mcdee">@mcdee</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-4881">4881</a>
                </td>

                <td className="title">Deposit Contract Snapshot Interface</td>
                <td className="author">
                  Mark Mackey&nbsp;(
                  <a href="https://github.com/ethDreamer">@ethDreamer</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-5749">5749</a>
                </td>

                <td className="title">The 'window.evmproviders' object</td>
                <td className="author">
                  Kosala Hemachandra&nbsp;(
                  <a href="https://github.com/kvhnuke">@kvhnuke</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-6963">6963</a>
                </td>

                <td className="title">Multi Injected Provider Discovery</td>
                <td className="author">
                  Pedro Gomes&nbsp;(
                  <a href="https://github.com/pedrouid">@pedrouid</a>), Kosala
                  Hemachandra&nbsp;(
                  <a href="https://github.com/kvhnuke">@kvhnuke</a>), Richard
                  Moore&nbsp;(<a href="https://github.com/ricmoo">@ricmoo</a>),
                  Gregory Markou&nbsp;(
                  <a href="https://github.com/GregTheGreek">@GregTheGreek</a>),
                  Kyle Den Hartog&nbsp;(
                  <a href="https://github.com/kdenhartog">@kdenhartog</a>),
                  Glitch&nbsp;(
                  <a href="https://github.com/glitch-txs">@glitch-txs</a>), Jake
                  Moxey&nbsp;(<a href="https://github.com/jxom">@jxom</a>),
                  Pierre Bertet&nbsp;(
                  <a href="https://github.com/bpierre">@bpierre</a>), Darryl
                  Yeo&nbsp;(
                  <a href="https://github.com/darrylyeo">@darrylyeo</a>),
                  Yaroslav Sergievsky&nbsp;(
                  <a href="https://github.com/everdimension">@everdimension</a>)
                </td>
              </tr>
            </tbody>
          </table>

          <h2 id="last-call">Last Call</h2>
          <table className="eiptable">
            <thead>
              <tr>
                <th className="eipnum">Number</th>
                <th className="date">Review ends</th>
                <th className="title">Title</th>
                <th className="author">Author</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3076">3076</a>
                </td>

                <td className="date">2021-11-03</td>

                <td className="title">
                  Slashing Protection Interchange Format
                </td>
                <td className="author">
                  Michael Sproul&nbsp;(
                  <a href="https://github.com/michaelsproul">@michaelsproul</a>
                  ), Sacha Saint-Leger&nbsp;(
                  <a href="https://github.com/sachayves">@sachayves</a>), Danny
                  Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-5792">5792</a>
                </td>

                <td className="date">2024-07-24</td>

                <td className="title">Wallet Call API</td>
                <td className="author">
                  Moody Salem&nbsp;(
                  <a href="https://github.com/moodysalem">@moodysalem</a>),
                  Lukas Rosario&nbsp;(
                  <a href="https://github.com/lukasrosario">@lukasrosario</a>),
                  Wilson Cusack&nbsp;(
                  <a href="https://github.com/wilsoncusack">@wilsoncusack</a>),
                  Dror Tirosh&nbsp;(
                  <a href="https://github.com/drortirosh">@drortirosh</a>), Jake
                  Moxey&nbsp;(<a href="https://github.com/jxom">@jxom</a>),
                  Derek Rein&nbsp;(<a href="https://github.com/arein">@arein</a>
                  )
                </td>
              </tr>
            </tbody>
          </table>

          <h2 id="draft">Draft</h2>
          <table className="eiptable">
            <thead>
              <tr>
                <th className="eipnum">Number</th>
                <th className="title">Title</th>
                <th className="author">Author</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-7039">7039</a>
                </td>

                <td className="title">
                  Scheme-Handler Discovery Option for Wallets
                </td>
                <td className="author">
                  Sam Wilson&nbsp;(
                  <a href="https://github.com/SamWilsn">@SamWilsn</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-7713">7713</a>
                </td>

                <td className="title">Box type for EIP-712 messages</td>
                <td className="author">
                  Francisco Giordano&nbsp;(
                  <a href="https://github.com/frangio">@frangio</a>)
                </td>
              </tr>
            </tbody>
          </table>

          <h2 id="stagnant">Stagnant</h2>
          <table className="eiptable">
            <thead>
              <tr>
                <th className="eipnum">Number</th>
                <th className="title">Title</th>
                <th className="author">Author</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-107">107</a>
                </td>

                <td className="title">
                  safe "eth_sendTransaction" authorization via html popup
                </td>
                <td className="author">
                  Ronan Sandford&nbsp;(
                  <a href="https://github.com/wighawag">@wighawag</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-758">758</a>
                </td>

                <td className="title">
                  Subscriptions and filters for completed transactions
                </td>
                <td className="author">
                  Jack Peterson&nbsp;&lt;
                  <a href="mailto:jack@tinybike.net">jack@tinybike.net</a>&gt;
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1102">1102</a>
                </td>

                <td className="title">Opt-in account exposure</td>
                <td className="author">
                  Paul Bouchon&nbsp;&lt;
                  <a href="mailto:mail@bitpshr.net">mail@bitpshr.net</a>&gt;,
                  Erik Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1186">1186</a>
                </td>

                <td className="title">
                  RPC-Method to get Merkle Proofs - eth_getProof
                </td>
                <td className="author">
                  Simon Jentzsch&nbsp;&lt;
                  <a href="mailto:simon.jentzsch@slock.it">
                    simon.jentzsch@slock.it
                  </a>
                  &gt;, Christoph Jentzsch&nbsp;&lt;
                  <a href="mailto:christoph.jentzsch@slock.it">
                    christoph.jentzsch@slock.it
                  </a>
                  &gt;
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1474">1474</a>
                </td>

                <td className="title">Remote procedure call specification</td>
                <td className="author">
                  Paul Bouchon&nbsp;&lt;
                  <a href="mailto:mail@bitpshr.net">mail@bitpshr.net</a>&gt;,
                  Erik Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1571">1571</a>
                </td>

                <td className="title">EthereumStratum/2.0.0</td>
                <td className="author">
                  Andrea Lanfranchi&nbsp;(
                  <a href="https://github.com/AndreaLanfranchi">
                    @AndreaLanfranchi
                  </a>
                  ), Pawel Bylica&nbsp;(
                  <a href="https://github.com/chfast">@chfast</a>), Marius Van
                  Der Wijden&nbsp;(
                  <a href="https://github.com/MariusVanDerWijden">
                    @MariusVanDerWijden
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1767">1767</a>
                </td>

                <td className="title">
                  GraphQL interface to Ethereum node data
                </td>
                <td className="author">
                  Nick Johnson&nbsp;(
                  <a href="https://github.com/arachnid">@arachnid</a>), Raúl
                  Kripalani&nbsp;(<a href="https://github.com/raulk">@raulk</a>
                  ), Kris Shinn&nbsp;(
                  <a href="https://github.com/kshinn">@kshinn</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1803">1803</a>
                </td>

                <td className="title">Rename opcodes for clarity</td>
                <td className="author">
                  Alex Beregszaszi&nbsp;(
                  <a href="https://github.com/axic">@axic</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1898">1898</a>
                </td>

                <td className="title">
                  Add `blockHash` to defaultBlock methods
                </td>
                <td className="author">
                  Charles Cooper&nbsp;(
                  <a href="https://github.com/charles-cooper">
                    @charles-cooper
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1901">1901</a>
                </td>

                <td className="title">
                  Add OpenRPC Service Discovery To JSON-RPC Services
                </td>
                <td className="author">
                  Shane Jonas&nbsp;(
                  <a href="https://github.com/shanejonas">@shanejonas</a>),
                  Zachary Belford&nbsp;(
                  <a href="https://github.com/belfordz">@belfordz</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2003">2003</a>
                </td>

                <td className="title">
                  EVMC modules for implementations of precompiled contracts
                </td>
                <td className="author">
                  Paweł Bylica&nbsp;(
                  <a href="https://github.com/chfast">@chfast</a>), Alex
                  Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2015">2015</a>
                </td>

                <td className="title">wallet_updateEthereumChain RPC Method</td>
                <td className="author">
                  Pedro Gomes&nbsp;(
                  <a href="https://github.com/pedrouid">@pedrouid</a>), Erik
                  Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>),
                  Pandapip1&nbsp;(
                  <a href="https://github.com/Pandapip1">@Pandapip1</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2256">2256</a>
                </td>

                <td className="title">wallet_getOwnedAssets JSON-RPC Method</td>
                <td className="author">
                  Loredana Cirstea&nbsp;(
                  <a href="https://github.com/loredanacirstea">
                    @loredanacirstea
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2566">2566</a>
                </td>

                <td className="title">
                  Human Readable Parameters for Contract Function Execution
                </td>
                <td className="author">
                  Joseph Stockermans&nbsp;(
                  <a href="https://github.com/jstoxrocky">@jstoxrocky</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2831">2831</a>
                </td>

                <td className="title">Transaction Replacement Message Type</td>
                <td className="author">
                  Gregory Markou&nbsp;(
                  <a href="https://github.com/GregTheGreek">@GregTheGreek</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2844">2844</a>
                </td>

                <td className="title">
                  Add DID related methods to the JSON-RPC
                </td>
                <td className="author">
                  Joel Thorstensson&nbsp;(
                  <a href="https://github.com/oed">@oed</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3014">3014</a>
                </td>

                <td className="title">eth_symbol JSON-RPC method</td>
                <td className="author">
                  Peter Grassberger&nbsp;(
                  <a href="https://github.com/PeterTheOne">@PeterTheOne</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3030">3030</a>
                </td>

                <td className="title">BLS Remote Signer HTTP API</td>
                <td className="author">
                  Herman Junge&nbsp;(
                  <a href="https://github.com/hermanjunge">@hermanjunge</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3041">3041</a>
                </td>

                <td className="title">
                  Adds `baseFee` to `eth_getBlockByHash`
                </td>
                <td className="author">
                  Abdelhamid Bakhta&nbsp;(
                  <a href="https://github.com/abdelhamidbakhta">
                    @abdelhamidbakhta
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3044">3044</a>
                </td>

                <td className="title">
                  Adds `baseFee` to `eth_getBlockByNumber`
                </td>
                <td className="author">
                  Abdelhamid Bakhta&nbsp;(
                  <a href="https://github.com/abdelhamidbakhta">
                    @abdelhamidbakhta
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3045">3045</a>
                </td>

                <td className="title">
                  Adds `baseFee` to `eth_getUncleByBlockHashAndIndex`
                </td>
                <td className="author">
                  Abdelhamid Bakhta&nbsp;(
                  <a href="https://github.com/abdelhamidbakhta">
                    @abdelhamidbakhta
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3046">3046</a>
                </td>

                <td className="title">
                  Adds `baseFee` to `eth_getUncleByBlockNumberAndIndex`
                </td>
                <td className="author">
                  Abdelhamid Bakhta&nbsp;(
                  <a href="https://github.com/abdelhamidbakhta">
                    @abdelhamidbakhta
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3085">3085</a>
                </td>

                <td className="title">wallet_addEthereumChain RPC Method</td>
                <td className="author">
                  Erik Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>), Pedro
                  Gomes&nbsp;(
                  <a href="https://github.com/pedrouid">@pedrouid</a>),
                  Pandapip1&nbsp;(
                  <a href="https://github.com/Pandapip1">@Pandapip1</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3091">3091</a>
                </td>

                <td className="title">Block Explorer API Routes</td>
                <td className="author">
                  Pedro Gomes&nbsp;(
                  <a href="https://github.com/pedrouid">@pedrouid</a>),
                  ligi&nbsp;(<a href="https://github.com/ligi">@ligi</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3155">3155</a>
                </td>

                <td className="title">EVM trace specification</td>
                <td className="author">
                  Martin Holst Swende&nbsp;(
                  <a href="https://github.com/holiman">@holiman</a>), Marius van
                  der Wijden&nbsp;(
                  <a href="https://github.com/MariusVanDerWijden">
                    @MariusVanDerWijden
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3326">3326</a>
                </td>

                <td className="title">
                  Wallet Switch Ethereum Chain RPC Method
                  (`wallet_switchEthereumChain`)
                </td>
                <td className="author">
                  Erik Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3709">3709</a>
                </td>

                <td className="title">
                  Remove Support for Type 1 Transactions
                </td>
                <td className="author">
                  Gregory Markou&nbsp;(
                  <a href="https://github.com/GregTheGreek">@GregTheGreek</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-5345">5345</a>
                </td>

                <td className="title">Silent Signing Extension for JSON-RPC</td>
                <td className="author">
                  Stanley Wu&nbsp;(
                  <a href="https://github.com/fruit37">@fruit37</a>), Mücahit
                  Büyükyılmaz&nbsp;(
                  <a href="https://github.com/anndro">@anndro</a>), Muhammed
                  Emin Aydın&nbsp;(
                  <a href="https://github.com/muhammedea">@muhammedea</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-5593">5593</a>
                </td>

                <td className="title">
                  Restrict Ethereum Provider API Injection
                </td>
                <td className="author">
                  Yan Zhu&nbsp;(
                  <a href="https://github.com/diracdeltas">@diracdeltas</a>),
                  Brian R. Bondy&nbsp;(
                  <a href="https://github.com/bbondy">@bbondy</a>), Andrea
                  Brancaleoni&nbsp;(
                  <a href="https://github.com/thypon">@thypon</a>), Kyle Den
                  Hartog&nbsp;(
                  <a href="https://github.com/kdenhartog">@kdenhartog</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-6051">6051</a>
                </td>

                <td className="title">Private Key Encapsulation</td>
                <td className="author">
                  Base Labs&nbsp;(
                  <a href="https://github.com/Base-Labs">@Base-Labs</a>), Weiji
                  Guo&nbsp;(
                  <a href="https://github.com/weiji-cryptonatty">
                    @weiji-cryptonatty
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-6789">6789</a>
                </td>

                <td className="title">Rename gas to mana</td>
                <td className="author">
                  Pascal Caversaccio&nbsp;(
                  <a href="https://github.com/pcaversaccio">@pcaversaccio</a>)
                </td>
              </tr>
            </tbody>
          </table>

          <h2 id="withdrawn">Withdrawn</h2>
          <table className="eiptable">
            <thead>
              <tr>
                <th className="eipnum">Number</th>
                <th className="title">Title</th>
                <th className="author">Author</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2786">2786</a>
                </td>

                <td className="title">
                  Ethereum Provider Connect/Disconnect Events
                </td>
                <td className="author">
                  Micah Zoltu&nbsp;(
                  <a href="https://github.com/MicahZoltu">@MicahZoltu</a>), Erik
                  Marks&nbsp;(
                  <a href="https://github.com/rekmarks">@rekmarks</a>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}
