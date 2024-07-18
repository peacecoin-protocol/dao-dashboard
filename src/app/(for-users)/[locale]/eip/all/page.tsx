'use client'

import '../style.css'
export default function ForAllPage() {
  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="post-content ">
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
        </div>{' '}
        <h1 className="post-title">All</h1>
        <h2 id="living">Living</h2>
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
                <a href="/EIPS/eip-1">1</a>
              </td>

              <td className="title">EIP Purpose and Guidelines</td>
              <td className="author">
                Martin Becze&nbsp;&lt;
                <a href="mailto:mb@ethereum.org">mb@ethereum.org</a>&gt;, Hudson
                Jameson&nbsp;&lt;
                <a href="mailto:hudson@ethereum.org">hudson@ethereum.org</a>
                &gt;, et al.
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5069">5069</a>
              </td>

              <td className="title">EIP Editor Handbook</td>
              <td className="author">
                Pooja Ranjan&nbsp;(
                <a href="https://github.com/poojaranjan">@poojaranjan</a>),
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>), Sam
                Wilson&nbsp;(<a href="https://github.com/SamWilsn">@SamWilsn</a>
                ), et al.
              </td>
            </tr>
          </tbody>
        </table>
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
                <a href="/EIPS/eip-2">2</a>
              </td>

              <td className="title">Homestead Hard-fork Changes</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4">4</a>
              </td>

              <td className="title">EIP Classification</td>
              <td className="author">
                Joseph Chow&nbsp;(
                <a href="https://github.com/ethers">@ethers</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5">5</a>
              </td>

              <td className="title">Gas Usage for `RETURN` and `CALL*`</td>
              <td className="author">
                Christian Reitwiessner&nbsp;&lt;
                <a href="mailto:c@ethdev.com">c@ethdev.com</a>&gt;
              </td>
            </tr>

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
                <a href="/EIPS/eip-7">7</a>
              </td>

              <td className="title">DELEGATECALL</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-8">8</a>
              </td>

              <td className="title">
                devp2p Forward Compatibility Requirements for Homestead
              </td>
              <td className="author">
                Felix Lange&nbsp;&lt;
                <a href="mailto:felix@ethdev.com">felix@ethdev.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-20">20</a>
              </td>

              <td className="title">Token Standard</td>
              <td className="author">
                Fabian Vogelsteller&nbsp;&lt;
                <a href="mailto:fabian@ethereum.org">fabian@ethereum.org</a>
                &gt;, Vitalik Buterin&nbsp;&lt;
                <a href="mailto:vitalik.buterin@ethereum.org">
                  vitalik.buterin@ethereum.org
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-55">55</a>
              </td>

              <td className="title">Mixed-case checksum address encoding</td>
              <td className="author">
                Vitalik Buterin&nbsp;&lt;
                <a href="mailto:vitalik.buterin@ethereum.org">
                  vitalik.buterin@ethereum.org
                </a>
                &gt;, Alex Van de Sande&nbsp;&lt;
                <a href="mailto:avsa@ethereum.org">avsa@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-100">100</a>
              </td>

              <td className="title">
                Change difficulty adjustment to target mean block time including
                uncles
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-137">137</a>
              </td>

              <td className="title">
                Ethereum Domain Name Service - Specification
              </td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:arachnid@notdot.net">arachnid@notdot.net</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-140">140</a>
              </td>

              <td className="title">REVERT instruction</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Nikolai
                Mushegian&nbsp;&lt;
                <a href="mailto:nikolai@nexusdev.us">nikolai@nexusdev.us</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-141">141</a>
              </td>

              <td className="title">Designated invalid EVM instruction</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-145">145</a>
              </td>

              <td className="title">Bitwise shifting instructions in EVM</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-150">150</a>
              </td>

              <td className="title">
                Gas cost changes for IO-heavy operations
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-152">152</a>
              </td>

              <td className="title">
                Add BLAKE2 compression function `F` precompile
              </td>
              <td className="author">
                Tjaden Hess&nbsp;&lt;
                <a href="mailto:tah83@cornell.edu">tah83@cornell.edu</a>&gt;,
                Matt Luongo&nbsp;(
                <a href="https://github.com/mhluongo">@mhluongo</a>), Piotr
                Dyraga&nbsp;(<a href="https://github.com/pdyraga">@pdyraga</a>),
                James Hancock&nbsp;(
                <a href="https://github.com/MadeOfTin">@MadeOfTin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-155">155</a>
              </td>

              <td className="title">Simple replay attack protection</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-158">158</a>
              </td>

              <td className="title">State clearing</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-160">160</a>
              </td>

              <td className="title">EXP cost increase</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-161">161</a>
              </td>

              <td className="title">
                State trie clearing (invariant-preserving alternative)
              </td>
              <td className="author">
                Gavin Wood&nbsp;(
                <a href="https://github.com/gavofyork">@gavofyork</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-162">162</a>
              </td>

              <td className="title">Initial ENS Hash Registrar</td>
              <td className="author">
                Maurelian, Nick Johnson&nbsp;&lt;
                <a href="mailto:nick@ethereum.org">nick@ethereum.org</a>&gt;,
                Alex Van de Sande&nbsp;&lt;
                <a href="mailto:avsa@ethereum.org">avsa@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-165">165</a>
              </td>

              <td className="title">Standard Interface Detection</td>
              <td className="author">
                Christian Reitwießner&nbsp;&lt;
                <a href="mailto:chris@ethereum.org">chris@ethereum.org</a>&gt;,
                Nick Johnson&nbsp;&lt;
                <a href="mailto:nick@ethereum.org">nick@ethereum.org</a>&gt;,
                Fabian Vogelsteller&nbsp;&lt;
                <a href="mailto:fabian@lukso.network">fabian@lukso.network</a>
                &gt;, Jordi Baylina&nbsp;&lt;
                <a href="mailto:jordi@baylina.cat">jordi@baylina.cat</a>&gt;,
                Konrad Feldmeier&nbsp;&lt;
                <a href="mailto:konrad.feldmeier@brainbot.com">
                  konrad.feldmeier@brainbot.com
                </a>
                &gt;, William Entriken&nbsp;&lt;
                <a href="mailto:github.com@phor.net">github.com@phor.net</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-170">170</a>
              </td>

              <td className="title">Contract code size limit</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-173">173</a>
              </td>

              <td className="title">Contract Ownership Standard</td>
              <td className="author">
                Nick Mudge&nbsp;(<a href="https://github.com/mudgen">@mudgen</a>
                ), Dan Finlay&nbsp;&lt;
                <a href="mailto:dan@danfinlay.com">dan@danfinlay.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-181">181</a>
              </td>

              <td className="title">
                ENS support for reverse resolution of Ethereum addresses
              </td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:arachnid@notdot.net">arachnid@notdot.net</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-190">190</a>
              </td>

              <td className="title">
                Ethereum Smart Contract Packaging Standard
              </td>
              <td className="author">
                Piper Merriam&nbsp;(
                <a href="https://github.com/pipermerriam">@pipermerriam</a>),
                Tim Coulter&nbsp;(
                <a href="https://github.com/tcoulter">@tcoulter</a>), Denis
                Erfurt&nbsp;(<a href="https://github.com/mhhf">@mhhf</a>), RJ
                Catalano&nbsp;(<a href="https://github.com/VoR0220">@VoR0220</a>
                ), Iuri Matias&nbsp;(
                <a href="https://github.com/iurimatias">@iurimatias</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-191">191</a>
              </td>

              <td className="title">Signed Data Standard</td>
              <td className="author">
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>), Nick
                Johnson&nbsp;&lt;
                <a href="mailto:arachnid@notdot.net">arachnid@notdot.net</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-196">196</a>
              </td>

              <td className="title">
                Precompiled contracts for addition and scalar multiplication on
                the elliptic curve alt_bn128
              </td>
              <td className="author">
                Christian Reitwiessner&nbsp;&lt;
                <a href="mailto:chris@ethereum.org">chris@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-197">197</a>
              </td>

              <td className="title">
                Precompiled contracts for optimal ate pairing check on the
                elliptic curve alt_bn128
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;&lt;
                <a href="mailto:vitalik@ethereum.org">vitalik@ethereum.org</a>
                &gt;, Christian Reitwiessner&nbsp;&lt;
                <a href="mailto:chris@ethereum.org">chris@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-198">198</a>
              </td>

              <td className="title">Big integer modular exponentiation</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-211">211</a>
              </td>

              <td className="title">
                New opcodes: RETURNDATASIZE and RETURNDATACOPY
              </td>
              <td className="author">
                Christian Reitwiessner&nbsp;&lt;
                <a href="mailto:chris@ethereum.org">chris@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-214">214</a>
              </td>

              <td className="title">New opcode STATICCALL</td>
              <td className="author">
                Vitalik Buterin&nbsp;&lt;
                <a href="mailto:vitalik@ethereum.org">vitalik@ethereum.org</a>
                &gt;, Christian Reitwiessner&nbsp;&lt;
                <a href="mailto:chris@ethereum.org">chris@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-223">223</a>
              </td>

              <td className="title">Token with transaction handling model</td>
              <td className="author">
                Dexaran (@Dexaran)&nbsp;&lt;
                <a href="mailto:dexaran@ethereumclassic.org">
                  dexaran@ethereumclassic.org
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-225">225</a>
              </td>

              <td className="title">
                Clique proof-of-authority consensus protocol
              </td>
              <td className="author">
                Péter Szilágyi&nbsp;&lt;
                <a href="mailto:peterke@gmail.com">peterke@gmail.com</a>&gt;
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
                <a href="/EIPS/eip-600">600</a>
              </td>

              <td className="title">
                Ethereum purpose allocation for Deterministic Wallets
              </td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>), Micah
                Zoltu&nbsp;(
                <a href="https://github.com/micahzoltu">@micahzoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-601">601</a>
              </td>

              <td className="title">
                Ethereum hierarchy for deterministic wallets
              </td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>), Micah
                Zoltu&nbsp;(
                <a href="https://github.com/micahzoltu">@micahzoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-606">606</a>
              </td>

              <td className="title">Hardfork Meta: Homestead</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-607">607</a>
              </td>

              <td className="title">Hardfork Meta: Spurious Dragon</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-608">608</a>
              </td>

              <td className="title">Hardfork Meta: Tangerine Whistle</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-609">609</a>
              </td>

              <td className="title">Hardfork Meta: Byzantium</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-627">627</a>
              </td>

              <td className="title">Whisper Specification</td>
              <td className="author">
                Vlad Gluhovsky&nbsp;&lt;
                <a href="mailto:gluk256@gmail.com">gluk256@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-649">649</a>
              </td>

              <td className="title">
                Metropolis Difficulty Bomb Delay and Block Reward Reduction
              </td>
              <td className="author">
                Afri Schoedon&nbsp;(
                <a href="https://github.com/5chdn">@5chdn</a>), Vitalik
                Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-658">658</a>
              </td>

              <td className="title">
                Embedding transaction status code in receipts
              </td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:nick@ethereum.org">nick@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-681">681</a>
              </td>

              <td className="title">URL Format for Transaction Requests</td>
              <td className="author">
                Daniel A. Nagy&nbsp;(
                <a href="https://github.com/nagydani">@nagydani</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-684">684</a>
              </td>

              <td className="title">Revert creation in case of collision</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Renan
                Rodrigues de Souza&nbsp;(
                <a href="https://github.com/RenanSouza2">@RenanSouza2</a>)
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
                <a href="mailto:isaac.ardis@gmail.com">isaac.ardis@gmail.com</a>
                &gt;, Wei Tang&nbsp;(
                <a href="https://github.com/sorpaas">@sorpaas</a>), Fan
                Torchz&nbsp;(<a href="https://github.com/tcz001">@tcz001</a>),
                Erik Marks&nbsp;(
                <a href="https://github.com/rekmarks">@rekmarks</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-706">706</a>
              </td>

              <td className="title">DEVp2p snappy compression</td>
              <td className="author">
                Péter Szilágyi&nbsp;&lt;
                <a href="mailto:peter@ethereum.org">peter@ethereum.org</a>&gt;
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
                <a href="/EIPS/eip-721">721</a>
              </td>

              <td className="title">Non-Fungible Token Standard</td>
              <td className="author">
                William Entriken&nbsp;(
                <a href="https://github.com/fulldecent">@fulldecent</a>), Dieter
                Shirley&nbsp;&lt;
                <a href="mailto:dete@axiomzen.co">dete@axiomzen.co</a>&gt;,
                Jacob Evans&nbsp;&lt;
                <a href="mailto:jacob@dekz.net">jacob@dekz.net</a>&gt;,
                Nastassia Sachs&nbsp;&lt;
                <a href="mailto:nastassia.sachs@protonmail.com">
                  nastassia.sachs@protonmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-747">747</a>
              </td>

              <td className="title">wallet_watchAsset RPC Method</td>
              <td className="author">
                Dan Finlay&nbsp;(
                <a href="https://github.com/danfinlay">@danfinlay</a>), Esteban
                Mino&nbsp;(
                <a href="https://github.com/estebanmino">@estebanmino</a>),
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-777">777</a>
              </td>

              <td className="title">Token Standard</td>
              <td className="author">
                Jacques Dafflon&nbsp;&lt;
                <a href="mailto:mail@0xjac.com">mail@0xjac.com</a>&gt;, Jordi
                Baylina&nbsp;&lt;
                <a href="mailto:jordi@baylina.cat">jordi@baylina.cat</a>&gt;,
                Thomas Shababi&nbsp;&lt;
                <a href="mailto:tom@truelevel.io">tom@truelevel.io</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-778">778</a>
              </td>

              <td className="title">Ethereum Node Records (ENR)</td>
              <td className="author">
                Felix Lange&nbsp;&lt;
                <a href="mailto:fjl@ethereum.org">fjl@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-779">779</a>
              </td>

              <td className="title">Hardfork Meta: DAO Fork</td>
              <td className="author">
                Casey Detrio&nbsp;(
                <a href="https://github.com/cdetrio">@cdetrio</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-820">820</a>
              </td>

              <td className="title">Pseudo-introspection Registry Contract</td>
              <td className="author">
                Jordi Baylina&nbsp;&lt;
                <a href="mailto:jordi@baylina.cat">jordi@baylina.cat</a>&gt;,
                Jacques Dafflon&nbsp;&lt;
                <a href="mailto:jacques@dafflon.tech">jacques@dafflon.tech</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-868">868</a>
              </td>

              <td className="title">Node Discovery v4 ENR Extension</td>
              <td className="author">
                Felix Lange&nbsp;&lt;
                <a href="mailto:fjl@ethereum.org">fjl@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1013">1013</a>
              </td>

              <td className="title">Hardfork Meta: Constantinople</td>
              <td className="author">
                Nick Savers&nbsp;(
                <a href="https://github.com/nicksavers">@nicksavers</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1014">1014</a>
              </td>

              <td className="title">Skinny CREATE2</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1046">1046</a>
              </td>

              <td className="title">tokenURI Interoperability</td>
              <td className="author">
                Tommy Nicholas&nbsp;(
                <a href="https://github.com/tomasienrbc">@tomasienrbc</a>), Matt
                Russo&nbsp;(<a href="https://github.com/mateosu">@mateosu</a>),
                John Zettler&nbsp;(
                <a href="https://github.com/JohnZettler">@JohnZettler</a>), Matt
                Condon&nbsp;(<a href="https://github.com/shrugs">@shrugs</a>),
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1052">1052</a>
              </td>

              <td className="title">EXTCODEHASH opcode</td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:arachnid@notdot.net">arachnid@notdot.net</a>
                &gt;, Paweł Bylica&nbsp;&lt;
                <a href="mailto:pawel@ethereum.org">pawel@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1108">1108</a>
              </td>

              <td className="title">Reduce alt_bn128 precompile gas costs</td>
              <td className="author">
                Antonio Salazar Cardozo&nbsp;(
                <a href="https://github.com/shadowfiend">@shadowfiend</a>),
                Zachary Williamson&nbsp;(
                <a href="https://github.com/zac-williamson">@zac-williamson</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1153">1153</a>
              </td>

              <td className="title">Transient storage opcodes</td>
              <td className="author">
                Alexey Akhunov&nbsp;(
                <a href="https://github.com/AlexeyAkhunov">@AlexeyAkhunov</a>),
                Moody Salem&nbsp;(
                <a href="https://github.com/moodysalem">@moodysalem</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1155">1155</a>
              </td>

              <td className="title">Multi Token Standard</td>
              <td className="author">
                Witek Radomski&nbsp;&lt;
                <a href="mailto:witek@enjin.io">witek@enjin.io</a>&gt;, Andrew
                Cooke&nbsp;&lt;
                <a href="mailto:ac0dem0nk3y@gmail.com">ac0dem0nk3y@gmail.com</a>
                &gt;, Philippe Castonguay (@phabc)&nbsp;&lt;
                <a href="mailto:pc@horizongames.net">pc@horizongames.net</a>
                &gt;, James Therien&nbsp;&lt;
                <a href="mailto:james@turing-complete.com">
                  james@turing-complete.com
                </a>
                &gt;, Eric Binet&nbsp;&lt;
                <a href="mailto:eric@enjin.io">eric@enjin.io</a>&gt;, Ronan
                Sandford (@wighawag)&nbsp;&lt;
                <a href="mailto:wighawag@gmail.com">wighawag@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1167">1167</a>
              </td>

              <td className="title">Minimal Proxy Contract</td>
              <td className="author">
                Peter Murray&nbsp;(
                <a href="https://github.com/yarrumretep">@yarrumretep</a>), Nate
                Welch&nbsp;(<a href="https://github.com/flygoing">@flygoing</a>
                ), Joe Messerman&nbsp;(
                <a href="https://github.com/JAMesserman">@JAMesserman</a>)
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
                Garreau&nbsp;(<a href="https://github.com/wolovim">@wolovim</a>
                ), Erik Marks&nbsp;(
                <a href="https://github.com/rekmarks">@rekmarks</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1234">1234</a>
              </td>

              <td className="title">
                Constantinople Difficulty Bomb Delay and Block Reward Adjustment
              </td>
              <td className="author">
                Afri Schoedon&nbsp;(
                <a href="https://github.com/5chdn">@5chdn</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1271">1271</a>
              </td>

              <td className="title">
                Standard Signature Validation Method for Contracts
              </td>
              <td className="author">
                Francisco Giordano&nbsp;(
                <a href="https://github.com/frangio">@frangio</a>), Matt
                Condon&nbsp;(<a href="https://github.com/shrugs">@shrugs</a>),
                Philippe Castonguay&nbsp;(
                <a href="https://github.com/PhABC">@PhABC</a>), Amir
                Bandeali&nbsp;(
                <a href="https://github.com/abandeali1">@abandeali1</a>), Jorge
                Izquierdo&nbsp;(<a href="https://github.com/izqui">@izqui</a>),
                Bertrand Masius&nbsp;(
                <a href="https://github.com/catageek">@catageek</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1283">1283</a>
              </td>

              <td className="title">
                Net gas metering for SSTORE without dirty maps
              </td>
              <td className="author">
                Wei Tang&nbsp;(<a href="https://github.com/sorpaas">@sorpaas</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1328">1328</a>
              </td>

              <td className="title">WalletConnect URI Format</td>
              <td className="author">
                ligi&nbsp;(<a href="https://github.com/ligi">@ligi</a>), Pedro
                Gomes&nbsp;(<a href="https://github.com/pedrouid">@pedrouid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1344">1344</a>
              </td>

              <td className="title">ChainID opcode</td>
              <td className="author">
                Richard Meissner&nbsp;(
                <a href="https://github.com/rmeissner">@rmeissner</a>), Bryant
                Eisenbach&nbsp;(
                <a href="https://github.com/fubuloubu">@fubuloubu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1363">1363</a>
              </td>

              <td className="title">Payable Token</td>
              <td className="author">
                Vittorio Minacori&nbsp;(
                <a href="https://github.com/vittominacori">@vittominacori</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1559">1559</a>
              </td>

              <td className="title">Fee market change for ETH 1.0 chain</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Eric
                Conner&nbsp;(<a href="https://github.com/econoar">@econoar</a>),
                Rick Dudley&nbsp;(
                <a href="https://github.com/AFDudley">@AFDudley</a>), Matthew
                Slipper&nbsp;(
                <a href="https://github.com/mslipper">@mslipper</a>), Ian
                Norden&nbsp;(<a href="https://github.com/i-norden">@i-norden</a>
                ), Abdelhamid Bakhta&nbsp;(
                <a href="https://github.com/abdelhamidbakhta">
                  @abdelhamidbakhta
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1679">1679</a>
              </td>

              <td className="title">Hardfork Meta: Istanbul</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Afri
                Schoedon&nbsp;(<a href="https://github.com/5chdn">@5chdn</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1716">1716</a>
              </td>

              <td className="title">Hardfork Meta: Petersburg</td>
              <td className="author">
                Afri Schoedon&nbsp;(
                <a href="https://github.com/5chdn">@5chdn</a>), Marius van der
                Wijden&nbsp;(
                <a href="https://github.com/MariusVanDerWijden">
                  @MariusVanDerWijden
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1820">1820</a>
              </td>

              <td className="title">Pseudo-introspection Registry Contract</td>
              <td className="author">
                Jordi Baylina&nbsp;&lt;
                <a href="mailto:jordi@baylina.cat">jordi@baylina.cat</a>&gt;,
                Jacques Dafflon&nbsp;&lt;
                <a href="mailto:mail@0xjac.com">mail@0xjac.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1884">1884</a>
              </td>

              <td className="title">
                Repricing for trie-size-dependent opcodes
              </td>
              <td className="author">
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1967">1967</a>
              </td>

              <td className="title">Proxy Storage Slots</td>
              <td className="author">
                Santiago Palladino&nbsp;(
                <a href="https://github.com/spalladino">@spalladino</a>),
                Francisco Giordano&nbsp;(
                <a href="https://github.com/frangio">@frangio</a>), Hadrien
                Croubois&nbsp;(<a href="https://github.com/Amxx">@Amxx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2028">2028</a>
              </td>

              <td className="title">Transaction data gas cost reduction</td>
              <td className="author">
                Alexey Akhunov&nbsp;(
                <a href="https://github.com/AlexeyAkhunov">@AlexeyAkhunov</a>),
                Eli Ben Sasson&nbsp;&lt;
                <a href="mailto:eli@starkware.co">eli@starkware.co</a>&gt;, Tom
                Brand&nbsp;&lt;
                <a href="mailto:tom@starkware.co">tom@starkware.co</a>&gt;,
                Louis Guthmann&nbsp;&lt;
                <a href="mailto:louis@starkware.co">louis@starkware.co</a>&gt;,
                Avihu Levy&nbsp;&lt;
                <a href="mailto:avihu@starkware.co">avihu@starkware.co</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2098">2098</a>
              </td>

              <td className="title">Compact Signature Representation</td>
              <td className="author">
                Richard Moore&nbsp;(
                <a href="https://github.com/ricmoo">@ricmoo</a>), Nick
                Johnson&nbsp;&lt;
                <a href="mailto:nick@ethereum.org">nick@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2124">2124</a>
              </td>

              <td className="title">
                Fork identifier for chain compatibility checks
              </td>
              <td className="author">
                Péter Szilágyi&nbsp;&lt;
                <a href="mailto:peterke@gmail.com">peterke@gmail.com</a>&gt;,
                Felix Lange&nbsp;&lt;
                <a href="mailto:fjl@ethereum.org">fjl@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2135">2135</a>
              </td>

              <td className="title">Consumable Interface (Tickets, etc)</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
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
                <a href="/EIPS/eip-2200">2200</a>
              </td>

              <td className="title">
                Structured Definitions for Net Gas Metering
              </td>
              <td className="author">
                Wei Tang&nbsp;(<a href="https://github.com/sorpaas">@sorpaas</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2228">2228</a>
              </td>

              <td className="title">
                Canonicalize the name of network ID 1 and chain ID 1
              </td>
              <td className="author">
                William Entriken&nbsp;(
                <a href="https://github.com/fulldecent">@fulldecent</a>)
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
                Marks&nbsp;(<a href="https://github.com/rekmarks">@rekmarks</a>
                ), Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2309">2309</a>
              </td>

              <td className="title">ERC-721 Consecutive Transfer Extension</td>
              <td className="author">
                Sean Papanikolas&nbsp;(
                <a href="https://github.com/pizzarob">@pizzarob</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2364">2364</a>
              </td>

              <td className="title">
                eth/64: forkid-extended protocol handshake
              </td>
              <td className="author">
                Péter Szilágyi&nbsp;&lt;
                <a href="mailto:peterke@gmail.com">peterke@gmail.com</a>&gt;,
                Péter Szilágyi&nbsp;(
                <a href="https://github.com/karalabe">@karalabe</a>), Tim
                Beiko&nbsp;(<a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2384">2384</a>
              </td>

              <td className="title">Muir Glacier Difficulty Bomb Delay</td>
              <td className="author">
                Eric Conner&nbsp;(
                <a href="https://github.com/econoar">@econoar</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2387">2387</a>
              </td>

              <td className="title">Hardfork Meta: Muir Glacier</td>
              <td className="author">
                James Hancock&nbsp;(
                <a href="https://github.com/madeoftin">@madeoftin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2464">2464</a>
              </td>

              <td className="title">
                eth/65: transaction announcements and retrievals
              </td>
              <td className="author">
                Péter Szilágyi&nbsp;&lt;
                <a href="mailto:peterke@gmail.com">peterke@gmail.com</a>&gt;,
                Péter Szilágyi&nbsp;(
                <a href="https://github.com/karalabe">@karalabe</a>), Gary
                Rong&nbsp;&lt;
                <a href="mailto:garyrong0905@gmail.com">
                  garyrong0905@gmail.com
                </a>
                &gt;, Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2481">2481</a>
              </td>

              <td className="title">eth/66 request identifier</td>
              <td className="author">
                Christoph Burgdorf&nbsp;(
                <a href="https://github.com/cburgdorf">@cburgdorf</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2535">2535</a>
              </td>

              <td className="title">Diamonds, Multi-Facet Proxy</td>
              <td className="author">
                Nick Mudge&nbsp;(<a href="https://github.com/mudgen">@mudgen</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2565">2565</a>
              </td>

              <td className="title">ModExp Gas Cost</td>
              <td className="author">
                Kelly Olson&nbsp;(
                <a href="https://github.com/ineffectualproperty">
                  @ineffectualproperty
                </a>
                ), Sean Gulley&nbsp;(
                <a href="https://github.com/sean-sn">@sean-sn</a>), Simon
                Peffers&nbsp;(
                <a href="https://github.com/simonatsn">@simonatsn</a>), Justin
                Drake&nbsp;(
                <a href="https://github.com/justindrake">@justindrake</a>),
                Dankrad Feist&nbsp;(
                <a href="https://github.com/dankrad">@dankrad</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2612">2612</a>
              </td>

              <td className="title">
                Permit Extension for EIP-20 Signed Approvals
              </td>
              <td className="author">
                Martin Lundfall&nbsp;(
                <a href="https://github.com/Mrchico">@Mrchico</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2678">2678</a>
              </td>

              <td className="title">
                Revised Ethereum Smart Contract Packaging Standard (EthPM v3)
              </td>
              <td className="author">
                g. nicholas d’andrea&nbsp;(
                <a href="https://github.com/gnidan">@gnidan</a>), Piper
                Merriam&nbsp;(
                <a href="https://github.com/pipermerriam">@pipermerriam</a>),
                Nick Gheorghita&nbsp;(
                <a href="https://github.com/njgheorghita">@njgheorghita</a>),
                Christian Reitwiessner&nbsp;(
                <a href="https://github.com/chriseth">@chriseth</a>), Ben
                Hauser&nbsp;(
                <a href="https://github.com/iamdefinitelyahuman">
                  @iamdefinitelyahuman
                </a>
                ), Bryant Eisenbach&nbsp;(
                <a href="https://github.com/fubuloubu">@fubuloubu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2681">2681</a>
              </td>

              <td className="title">Limit account nonce to 2^64-1</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
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
                Marks&nbsp;(<a href="https://github.com/rekmarks">@rekmarks</a>)
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
                Marks&nbsp;(<a href="https://github.com/rekmarks">@rekmarks</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2718">2718</a>
              </td>

              <td className="title">Typed Transaction Envelope</td>
              <td className="author">
                Micah Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2771">2771</a>
              </td>

              <td className="title">
                Secure Protocol for Native Meta Transactions
              </td>
              <td className="author">
                Ronan Sandford&nbsp;(
                <a href="https://github.com/wighawag">@wighawag</a>), Liraz
                Siri&nbsp;(<a href="https://github.com/lirazsiri">@lirazsiri</a>
                ), Dror Tirosh&nbsp;(
                <a href="https://github.com/drortirosh">@drortirosh</a>), Yoav
                Weiss&nbsp;(<a href="https://github.com/yoavw">@yoavw</a>), Alex
                Forshtat&nbsp;(
                <a href="https://github.com/forshtat">@forshtat</a>), Hadrien
                Croubois&nbsp;(<a href="https://github.com/Amxx">@Amxx</a>),
                Sachin Tomar&nbsp;(
                <a href="https://github.com/tomarsachin2271">
                  @tomarsachin2271
                </a>
                ), Patrick McCorry&nbsp;(
                <a href="https://github.com/stonecoldpat">@stonecoldpat</a>),
                Nicolas Venturo&nbsp;(
                <a href="https://github.com/nventuro">@nventuro</a>), Fabian
                Vogelsteller&nbsp;(
                <a href="https://github.com/frozeman">@frozeman</a>), Gavin
                John&nbsp;(<a href="https://github.com/Pandapip1">@Pandapip1</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2929">2929</a>
              </td>

              <td className="title">
                Gas cost increases for state access opcodes
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Martin
                Swende&nbsp;(<a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2930">2930</a>
              </td>

              <td className="title">Optional access lists</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Martin
                Swende&nbsp;(<a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2976">2976</a>
              </td>

              <td className="title">Typed Transactions over Gossip</td>
              <td className="author">
                Micah Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2981">2981</a>
              </td>

              <td className="title">NFT Royalty Standard</td>
              <td className="author">
                Zach Burks&nbsp;(
                <a href="https://github.com/vexycats">@vexycats</a>), James
                Morgan&nbsp;(
                <a href="https://github.com/jamesmorgan">@jamesmorgan</a>),
                Blaine Malone&nbsp;(
                <a href="https://github.com/blmalone">@blmalone</a>), James
                Seibel&nbsp;(<a href="https://github.com/seibelj">@seibelj</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2982">2982</a>
              </td>

              <td className="title">Serenity Phase 0</td>
              <td className="author">
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                ), Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3156">3156</a>
              </td>

              <td className="title">Flash Loans</td>
              <td className="author">
                Alberto Cuesta Cañada&nbsp;(
                <a href="https://github.com/alcueca">@alcueca</a>), Fiona
                Kobayashi&nbsp;(
                <a href="https://github.com/fifikobayashi">@fifikobayashi</a>),
                fubuloubu&nbsp;(
                <a href="https://github.com/fubuloubu">@fubuloubu</a>), Austin
                Williams&nbsp;(
                <a href="https://github.com/onewayfunction">@onewayfunction</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3198">3198</a>
              </td>

              <td className="title">BASEFEE opcode</td>
              <td className="author">
                Abdelhamid Bakhta&nbsp;(
                <a href="https://github.com/abdelhamidbakhta">
                  @abdelhamidbakhta
                </a>
                ), Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3448">3448</a>
              </td>

              <td className="title">MetaProxy Standard</td>
              <td className="author">
                pinkiebell&nbsp;(
                <a href="https://github.com/pinkiebell">@pinkiebell</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3475">3475</a>
              </td>

              <td className="title">Abstract Storage Bonds</td>
              <td className="author">
                Yu Liu&nbsp;(
                <a href="https://github.com/yuliu-debond">@yuliu-debond</a>),
                Varun Deshpande&nbsp;(
                <a href="https://github.com/dr-chain">@dr-chain</a>), Cedric
                Ngakam&nbsp;(<a href="https://github.com/drikssy">@drikssy</a>),
                Dhruv Malik&nbsp;(
                <a href="https://github.com/dhruvmalik007">@dhruvmalik007</a>),
                Samuel Gwlanold Edoumou&nbsp;(
                <a href="https://github.com/Edoumou">@Edoumou</a>), Toufic
                Batrice&nbsp;(
                <a href="https://github.com/toufic0710">@toufic0710</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3525">3525</a>
              </td>

              <td className="title">Semi-Fungible Token</td>
              <td className="author">
                Will Wang&nbsp;(
                <a href="https://github.com/will42w">@will42w</a>), Mike
                Meng&nbsp;&lt;
                <a href="mailto:myan@solv.finance">myan@solv.finance</a>&gt;, Yi
                Cai (@YeeTsai)&nbsp;&lt;
                <a href="mailto:yee.tsai@gmail.com">yee.tsai@gmail.com</a>&gt;,
                Ryan Chow&nbsp;&lt;
                <a href="mailto:ryanchow@solv.finance">ryanchow@solv.finance</a>
                &gt;, Zhongxin Wu&nbsp;(
                <a href="https://github.com/Nerverwind">@Nerverwind</a>),
                AlvisDu&nbsp;(<a href="https://github.com/AlvisDu">@AlvisDu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3529">3529</a>
              </td>

              <td className="title">Reduction in refunds</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Martin
                Swende&nbsp;(<a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3541">3541</a>
              </td>

              <td className="title">
                Reject new contract code starting with the 0xEF byte
              </td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>), Alexey
                Akhunov&nbsp;(
                <a href="https://github.com/AlexeyAkhunov">@AlexeyAkhunov</a>),
                Christian Reitwiessner&nbsp;(
                <a href="https://github.com/chriseth">@chriseth</a>), Martin
                Swende&nbsp;(<a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3554">3554</a>
              </td>

              <td className="title">Difficulty Bomb Delay to December 2021</td>
              <td className="author">
                James Hancock&nbsp;(
                <a href="https://github.com/madeoftin">@madeoftin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3607">3607</a>
              </td>

              <td className="title">
                Reject transactions from senders with deployed code
              </td>
              <td className="author">
                Dankrad Feist&nbsp;(
                <a href="https://github.com/dankrad">@dankrad</a>), Dmitry
                Khovratovich&nbsp;(
                <a href="https://github.com/khovratovich">@khovratovich</a>),
                Marius van der Wijden&nbsp;(
                <a href="https://github.com/MariusVanDerWijden">
                  @MariusVanDerWijden
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3643">3643</a>
              </td>

              <td className="title">T-REX - Token for Regulated EXchanges</td>
              <td className="author">
                Joachim Lebrun&nbsp;(
                <a href="https://github.com/Joachim-Lebrun">@Joachim-Lebrun</a>
                ), Tony Malghem&nbsp;(
                <a href="https://github.com/TonyMalghem">@TonyMalghem</a>),
                Kevin Thizy&nbsp;(
                <a href="https://github.com/Nakasar">@Nakasar</a>), Luc
                Falempin&nbsp;(
                <a href="https://github.com/lfalempin">@lfalempin</a>), Adam
                Boudjemaa&nbsp;(
                <a href="https://github.com/Aboudjem">@Aboudjem</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3651">3651</a>
              </td>

              <td className="title">Warm COINBASE</td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3668">3668</a>
              </td>

              <td className="title">
                CCIP Read: Secure offchain data retrieval
              </td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3675">3675</a>
              </td>

              <td className="title">Upgrade consensus to Proof-of-Stake</td>
              <td className="author">
                Mikhail Kalinin&nbsp;(
                <a href="https://github.com/mkalinin">@mkalinin</a>), Danny
                Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>),
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3855">3855</a>
              </td>

              <td className="title">PUSH0 instruction</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Hugo De la
                cruz&nbsp;(<a href="https://github.com/hugo-dc">@hugo-dc</a>),
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3860">3860</a>
              </td>

              <td className="title">Limit and meter initcode</td>
              <td className="author">
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Andrei
                Maiboroda&nbsp;(<a href="https://github.com/gumb0">@gumb0</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4345">4345</a>
              </td>

              <td className="title">Difficulty Bomb Delay to June 2022</td>
              <td className="author">
                Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>), James
                Hancock&nbsp;(
                <a href="https://github.com/MadeOfTin">@MadeOfTin</a>), Thomas
                Jay Rush&nbsp;(
                <a href="https://github.com/tjayrush">@tjayrush</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4399">4399</a>
              </td>

              <td className="title">
                Supplant DIFFICULTY opcode with PREVRANDAO
              </td>
              <td className="author">
                Mikhail Kalinin&nbsp;(
                <a href="https://github.com/mkalinin">@mkalinin</a>), Danny
                Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4400">4400</a>
              </td>

              <td className="title">EIP-721 Consumable Extension</td>
              <td className="author">
                Daniel Ivanov&nbsp;(
                <a href="https://github.com/Daniel-K-Ivanov">
                  @Daniel-K-Ivanov
                </a>
                ), George Spasov&nbsp;(
                <a href="https://github.com/Perseverance">@Perseverance</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4519">4519</a>
              </td>

              <td className="title">
                Non-Fungible Tokens Tied to Physical Assets
              </td>
              <td className="author">
                Javier Arcenegui&nbsp;(
                <a href="https://github.com/Hardblock-IMSE-CNM">
                  @Hardblock-IMSE-CNM
                </a>
                ), Rosario Arjona&nbsp;(
                <a href="https://github.com/RosarioArjona">@RosarioArjona</a>),
                Roberto Román&nbsp;&lt;
                <a href="mailto:roman@imse-cnm.csic.es">
                  roman@imse-cnm.csic.es
                </a>
                &gt;, Iluminada Baturone&nbsp;(
                <a href="https://github.com/lumi2018">@lumi2018</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4626">4626</a>
              </td>

              <td className="title">Tokenized Vaults</td>
              <td className="author">
                Joey Santoro&nbsp;(
                <a href="https://github.com/joeysantoro">@joeysantoro</a>),
                t11s&nbsp;(
                <a href="https://github.com/transmissions11">
                  @transmissions11
                </a>
                ), Jet Jadeja&nbsp;(
                <a href="https://github.com/JetJadeja">@JetJadeja</a>), Alberto
                Cuesta Cañada&nbsp;(
                <a href="https://github.com/alcueca">@alcueca</a>), Señor
                Doggo&nbsp;(
                <a href="https://github.com/fubuloubu">@fubuloubu</a>)
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
                <a href="/EIPS/eip-4788">4788</a>
              </td>

              <td className="title">Beacon block root in the EVM</td>
              <td className="author">
                Alex Stokes&nbsp;(
                <a href="https://github.com/ralexstokes">@ralexstokes</a>),
                Ansgar Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>), Danny
                Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>),
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>),
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4804">4804</a>
              </td>

              <td className="title">
                Web3 URL to EVM Call Message Translation
              </td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>),
                Chao Pi&nbsp;(
                <a href="https://github.com/pichaoqkc">@pichaoqkc</a>), Sam
                Wilson&nbsp;(<a href="https://github.com/SamWilsn">@SamWilsn</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4834">4834</a>
              </td>

              <td className="title">Hierarchical Domains</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4844">4844</a>
              </td>

              <td className="title">Shard Blob Transactions</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Dankrad
                Feist&nbsp;(<a href="https://github.com/dankrad">@dankrad</a>),
                Diederik Loerakker&nbsp;(
                <a href="https://github.com/protolambda">@protolambda</a>),
                George Kadianakis&nbsp;(
                <a href="https://github.com/asn-d6">@asn-d6</a>), Matt
                Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>), Mofi
                Taiwo&nbsp;(<a href="https://github.com/Inphi">@Inphi</a>),
                Ansgar Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>)
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
                <a href="/EIPS/eip-4895">4895</a>
              </td>

              <td className="title">
                Beacon chain push withdrawals as operations
              </td>
              <td className="author">
                Alex Stokes&nbsp;(
                <a href="https://github.com/ralexstokes">@ralexstokes</a>),
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4906">4906</a>
              </td>

              <td className="title">EIP-721 Metadata Update Extension</td>
              <td className="author">
                Anders&nbsp;(<a href="https://github.com/0xanders">@0xanders</a>
                ), Lance&nbsp;(
                <a href="https://github.com/LanceSnow">@LanceSnow</a>),
                Shrug&nbsp;&lt;
                <a href="mailto:shrug@emojidao.org">shrug@emojidao.org</a>&gt;,
                Nathan&nbsp;&lt;
                <a href="mailto:nathan.gang@gemini.com">
                  nathan.gang@gemini.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4907">4907</a>
              </td>

              <td className="title">Rental NFT, an Extension of EIP-721</td>
              <td className="author">
                Anders&nbsp;(<a href="https://github.com/0xanders">@0xanders</a>
                ), Lance&nbsp;(
                <a href="https://github.com/LanceSnow">@LanceSnow</a>),
                Shrug&nbsp;&lt;
                <a href="mailto:shrug@emojidao.org">shrug@emojidao.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4910">4910</a>
              </td>

              <td className="title">Royalty Bearing NFTs</td>
              <td className="author">
                Andreas Freund&nbsp;(
                <a href="https://github.com/Therecanbeonlyone1969">
                  @Therecanbeonlyone1969
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4938">4938</a>
              </td>

              <td className="title">eth/67 - Removal of GetNodeData</td>
              <td className="author">
                Marius van der Wijden&nbsp;(
                <a href="https://github.com/MariusVanDerWijden">
                  @MariusVanDerWijden
                </a>
                ), Felix Lange&nbsp;&lt;
                <a href="mailto:fjl@ethereum.org">fjl@ethereum.org</a>&gt;, Gary
                Rong&nbsp;&lt;
                <a href="mailto:garyrong@ethereum.org">garyrong@ethereum.org</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4955">4955</a>
              </td>

              <td className="title">Vendor Metadata Extension for NFTs</td>
              <td className="author">
                Ignacio Mazzara&nbsp;(
                <a href="https://github.com/nachomazzara">@nachomazzara</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5006">5006</a>
              </td>

              <td className="title">Rental NFT, NFT User Extension</td>
              <td className="author">
                Lance&nbsp;(
                <a href="https://github.com/LanceSnow">@LanceSnow</a>),
                Anders&nbsp;(<a href="https://github.com/0xanders">@0xanders</a>
                ), Shrug&nbsp;&lt;
                <a href="mailto:shrug@emojidao.org">shrug@emojidao.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5007">5007</a>
              </td>

              <td className="title">Time NFT, ERC-721 Time Extension</td>
              <td className="author">
                Anders&nbsp;(<a href="https://github.com/0xanders">@0xanders</a>
                ), Lance&nbsp;(
                <a href="https://github.com/LanceSnow">@LanceSnow</a>),
                Shrug&nbsp;&lt;
                <a href="mailto:shrug@emojidao.org">shrug@emojidao.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5023">5023</a>
              </td>

              <td className="title">Shareable Non-Fungible Token</td>
              <td className="author">
                Jarno Marttila&nbsp;(
                <a href="https://github.com/yaruno">@yaruno</a>), Martin
                Moravek&nbsp;(
                <a href="https://github.com/mmartinmo">@mmartinmo</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5133">5133</a>
              </td>

              <td className="title">
                Delaying Difficulty Bomb to mid-September 2022
              </td>
              <td className="author">
                Tomasz Kajetan Stanczak&nbsp;(
                <a href="https://github.com/tkstanczak">@tkstanczak</a>), Eric
                Marti Haynes&nbsp;(
                <a href="https://github.com/ericmartihaynes">
                  @ericmartihaynes
                </a>
                ), Josh Klopfenstein&nbsp;(
                <a href="https://github.com/joshklop">@joshklop</a>), Abhimanyu
                Nag&nbsp;(
                <a href="https://github.com/AbhiMan1601">@AbhiMan1601</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5169">5169</a>
              </td>

              <td className="title">Client Script URI for Token Contracts</td>
              <td className="author">
                James&nbsp;(
                <a href="https://github.com/JamesSmartCell">@JamesSmartCell</a>
                ), Weiwu&nbsp;(
                <a href="https://github.com/weiwu-zhang">@weiwu-zhang</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5192">5192</a>
              </td>

              <td className="title">Minimal Soulbound NFTs</td>
              <td className="author">
                Tim Daubenschütz&nbsp;(
                <a href="https://github.com/TimDaub">@TimDaub</a>),
                Anders&nbsp;(<a href="https://github.com/0xanders">@0xanders</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5202">5202</a>
              </td>

              <td className="title">Blueprint contract format</td>
              <td className="author">
                Charles Cooper&nbsp;(
                <a href="https://github.com/charles-cooper">@charles-cooper</a>
                ), Edward Amor&nbsp;(
                <a href="https://github.com/skellet0r">@skellet0r</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5219">5219</a>
              </td>

              <td className="title">Contract Resource Requests</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5267">5267</a>
              </td>

              <td className="title">Retrieval of EIP-712 domain</td>
              <td className="author">
                Francisco Giordano&nbsp;(
                <a href="https://github.com/frangio">@frangio</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5313">5313</a>
              </td>

              <td className="title">Light Contract Ownership</td>
              <td className="author">
                William Entriken&nbsp;(
                <a href="https://github.com/fulldecent">@fulldecent</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5375">5375</a>
              </td>

              <td className="title">NFT Author Information and Consent</td>
              <td className="author">
                Samuele Marro&nbsp;(
                <a href="https://github.com/samuelemarro">@samuelemarro</a>),
                Luca Donno&nbsp;(
                <a href="https://github.com/lucadonnoh">@lucadonnoh</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5380">5380</a>
              </td>

              <td className="title">ERC-721 Entitlement Extension</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>), Tim
                Daubenschütz&nbsp;(
                <a href="https://github.com/TimDaub">@TimDaub</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5484">5484</a>
              </td>

              <td className="title">Consensual Soulbound Tokens</td>
              <td className="author">
                Buzz Cai&nbsp;(<a href="https://github.com/buzzcai">@buzzcai</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5489">5489</a>
              </td>

              <td className="title">NFT Hyperlink Extension</td>
              <td className="author">
                IronMan_CH&nbsp;(
                <a href="https://github.com/coderfengyun">@coderfengyun</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5507">5507</a>
              </td>

              <td className="title">Refundable Tokens</td>
              <td className="author">
                elie222&nbsp;(<a href="https://github.com/elie222">@elie222</a>
                ), Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5521">5521</a>
              </td>

              <td className="title">Referable NFT</td>
              <td className="author">
                Saber Yu&nbsp;(
                <a href="https://github.com/OniReimu">@OniReimu</a>), Qin
                Wang&nbsp;&lt;
                <a href="mailto:qin.wang@data61.csiro.au">
                  qin.wang@data61.csiro.au
                </a>
                &gt;, Shange Fu&nbsp;&lt;
                <a href="mailto:shange.fu@monash.edu">shange.fu@monash.edu</a>
                &gt;, Yilin Sai&nbsp;&lt;
                <a href="mailto:yilin.sai@data61.csiro.au">
                  yilin.sai@data61.csiro.au
                </a>
                &gt;, Shiping Chen&nbsp;&lt;
                <a href="mailto:shiping.chen@data61.csiro.au">
                  shiping.chen@data61.csiro.au
                </a>
                &gt;, Sherry Xu&nbsp;&lt;
                <a href="mailto:xiwei.xu@data61.csiro.au">
                  xiwei.xu@data61.csiro.au
                </a>
                &gt;, Jiangshan Yu&nbsp;&lt;
                <a href="mailto:jiangshan.yu@monash.edu">
                  jiangshan.yu@monash.edu
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5528">5528</a>
              </td>

              <td className="title">Refundable Fungible Token</td>
              <td className="author">
                StartfundInc&nbsp;(
                <a href="https://github.com/StartfundInc">@StartfundInc</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5564">5564</a>
              </td>

              <td className="title">Stealth Addresses</td>
              <td className="author">
                Toni Wahrstätter&nbsp;(
                <a href="https://github.com/nerolation">@nerolation</a>), Matt
                Solomon&nbsp;(<a href="https://github.com/mds1">@mds1</a>), Ben
                DiFrancesco&nbsp;(
                <a href="https://github.com/apbendi">@apbendi</a>), Vitalik
                Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5570">5570</a>
              </td>

              <td className="title">Digital Receipt Non-Fungible Tokens</td>
              <td className="author">
                Sean Darcy&nbsp;(
                <a href="https://github.com/darcys22">@darcys22</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5585">5585</a>
              </td>

              <td className="title">ERC-721 NFT Authorization</td>
              <td className="author">
                Veega Labs&nbsp;(
                <a href="https://github.com/VeegaLabsOfficial">
                  @VeegaLabsOfficial
                </a>
                ), Sean NG&nbsp;(
                <a href="https://github.com/ngveega">@ngveega</a>), Tiger&nbsp;(
                <a href="https://github.com/tiger0x">@tiger0x</a>), Fred&nbsp;(
                <a href="https://github.com/apan826">@apan826</a>), Fov
                Cao&nbsp;(<a href="https://github.com/fovcao">@fovcao</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5606">5606</a>
              </td>

              <td className="title">Multiverse NFTs</td>
              <td className="author">
                Gaurang Torvekar&nbsp;(
                <a href="https://github.com/gaurangtorvekar">
                  @gaurangtorvekar
                </a>
                ), Khemraj Adhawade&nbsp;(
                <a href="https://github.com/akhemraj">@akhemraj</a>), Nikhil
                Asrani&nbsp;(
                <a href="https://github.com/nikhilasrani">@nikhilasrani</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5615">5615</a>
              </td>

              <td className="title">ERC-1155 Supply Extension</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5646">5646</a>
              </td>

              <td className="title">Token State Fingerprint</td>
              <td className="author">
                Naim Ashhab&nbsp;(
                <a href="https://github.com/ashhanai">@ashhanai</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5656">5656</a>
              </td>

              <td className="title">MCOPY - Memory copying instruction</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paul
                Dworzanski&nbsp;(<a href="https://github.com/poemm">@poemm</a>),
                Jared Wasinger&nbsp;(
                <a href="https://github.com/jwasinger">@jwasinger</a>), Casey
                Detrio&nbsp;(<a href="https://github.com/cdetrio">@cdetrio</a>),
                Pawel Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>), Charles
                Cooper&nbsp;(
                <a href="https://github.com/charles-cooper">@charles-cooper</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5679">5679</a>
              </td>

              <td className="title">Token Minting and Burning</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5725">5725</a>
              </td>

              <td className="title">Transferable Vesting NFT</td>
              <td className="author">
                Apeguru&nbsp;(
                <a href="https://github.com/Apegurus">@Apegurus</a>), Marco De
                Vries&nbsp;&lt;
                <a href="mailto:marco@paladinsec.co">marco@paladinsec.co</a>
                &gt;, Mario&nbsp;&lt;
                <a href="mailto:mario@paladinsec.co">mario@paladinsec.co</a>
                &gt;, DeFiFoFum&nbsp;(
                <a href="https://github.com/DeFiFoFum">@DeFiFoFum</a>), Elliott
                Green&nbsp;(
                <a href="https://github.com/elliott-green">@elliott-green</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5732">5732</a>
              </td>

              <td className="title">Commit Interface</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>), Matt
                Stam&nbsp;(<a href="https://github.com/mattstam">@mattstam</a>)
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
                <a href="/EIPS/eip-5750">5750</a>
              </td>

              <td className="title">
                General Extensibility for Method Behaviors
              </td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5757">5757</a>
              </td>

              <td className="title">
                Process for Approving External Resources
              </td>
              <td className="author">
                Sam Wilson&nbsp;(
                <a href="https://github.com/SamWilsn">@SamWilsn</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5773">5773</a>
              </td>

              <td className="title">Context-Dependent Multi-Asset Tokens</td>
              <td className="author">
                Bruno Škvorc&nbsp;(
                <a href="https://github.com/Swader">@Swader</a>), Cicada&nbsp;(
                <a href="https://github.com/CicadaNCR">@CicadaNCR</a>), Steven
                Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Stevan
                Bogosavljevic&nbsp;(
                <a href="https://github.com/stevyhacker">@stevyhacker</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5793">5793</a>
              </td>

              <td className="title">eth/68 - Add tx type to tx announcement</td>
              <td className="author">
                Marius van der Wijden&nbsp;(
                <a href="https://github.com/MariusVanDerWijden">
                  @MariusVanDerWijden
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6049">6049</a>
              </td>

              <td className="title">Deprecate SELFDESTRUCT</td>
              <td className="author">
                William Entriken&nbsp;(
                <a href="https://github.com/fulldecent">@fulldecent</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6059">6059</a>
              </td>

              <td className="title">
                Parent-Governed Nestable Non-Fungible Tokens
              </td>
              <td className="author">
                Bruno Škvorc&nbsp;(
                <a href="https://github.com/Swader">@Swader</a>), Cicada&nbsp;(
                <a href="https://github.com/CicadaNCR">@CicadaNCR</a>), Steven
                Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Stevan
                Bogosavljevic&nbsp;(
                <a href="https://github.com/stevyhacker">@stevyhacker</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6066">6066</a>
              </td>

              <td className="title">Signature Validation Method for NFTs</td>
              <td className="author">
                Jack Boyuan Xu&nbsp;(
                <a href="https://github.com/boyuanx">@boyuanx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6105">6105</a>
              </td>

              <td className="title">No Intermediary NFT Trading Protocol</td>
              <td className="author">
                5660-eth&nbsp;(
                <a href="https://github.com/5660-eth">@5660-eth</a>), Silvere
                Heraudeau&nbsp;(
                <a href="https://github.com/lambdalf-dev">@lambdalf-dev</a>),
                Martin McConnell&nbsp;(
                <a href="https://github.com/offgridgecko">@offgridgecko</a>),
                Abu&nbsp;&lt;
                <a href="mailto:team10kuni@gmail.com">team10kuni@gmail.com</a>
                &gt;, Wizard Wang
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6122">6122</a>
              </td>

              <td className="title">Forkid checks based on timestamps</td>
              <td className="author">
                Marius van der Wijden&nbsp;(
                <a href="https://github.com/MariusVanDerWijden">
                  @MariusVanDerWijden
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6147">6147</a>
              </td>

              <td className="title">
                Guard of NFT/SBT, an Extension of ERC-721
              </td>
              <td className="author">
                5660-eth&nbsp;(
                <a href="https://github.com/5660-eth">@5660-eth</a>), Wizard
                Wang
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6150">6150</a>
              </td>

              <td className="title">Hierarchical NFTs</td>
              <td className="author">
                Keegan Lee&nbsp;(
                <a href="https://github.com/keeganlee">@keeganlee</a>),
                msfew&nbsp;&lt;
                <a href="mailto:msfew@hyperoracle.io">msfew@hyperoracle.io</a>
                &gt;, Kartin&nbsp;&lt;
                <a href="mailto:kartin@hyperoracle.io">kartin@hyperoracle.io</a>
                &gt;, qizhou&nbsp;(
                <a href="https://github.com/qizhou">@qizhou</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6220">6220</a>
              </td>

              <td className="title">
                Composable NFTs utilizing Equippable Parts
              </td>
              <td className="author">
                Bruno Škvorc&nbsp;(
                <a href="https://github.com/Swader">@Swader</a>), Cicada&nbsp;(
                <a href="https://github.com/CicadaNCR">@CicadaNCR</a>), Steven
                Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Stevan
                Bogosavljevic&nbsp;(
                <a href="https://github.com/stevyhacker">@stevyhacker</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6239">6239</a>
              </td>

              <td className="title">Semantic Soulbound Tokens</td>
              <td className="author">
                Jessica Chang&nbsp;(
                <a href="https://github.com/JessicaChg">@JessicaChg</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6381">6381</a>
              </td>

              <td className="title">
                Public Non-Fungible Token Emote Repository
              </td>
              <td className="author">
                Bruno Škvorc&nbsp;(
                <a href="https://github.com/Swader">@Swader</a>), Steven
                Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Stevan
                Bogosavljevic&nbsp;(
                <a href="https://github.com/stevyhacker">@stevyhacker</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6454">6454</a>
              </td>

              <td className="title">
                Minimal Transferable NFT detection interface
              </td>
              <td className="author">
                Bruno Škvorc&nbsp;(
                <a href="https://github.com/Swader">@Swader</a>), Francesco
                Sullo&nbsp;(<a href="https://github.com/sullof">@sullof</a>),
                Steven Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Stevan
                Bogosavljevic&nbsp;(
                <a href="https://github.com/stevyhacker">@stevyhacker</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6492">6492</a>
              </td>

              <td className="title">
                Signature Validation for Predeploy Contracts
              </td>
              <td className="author">
                Ivo Georgiev&nbsp;(
                <a href="https://github.com/Ivshti">@Ivshti</a>), Agustin
                Aguilar&nbsp;(
                <a href="https://github.com/Agusx1211">@Agusx1211</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6538">6538</a>
              </td>

              <td className="title">Stealth Meta-Address Registry</td>
              <td className="author">
                Matt Solomon&nbsp;(<a href="https://github.com/mds1">@mds1</a>),
                Toni Wahrstätter&nbsp;(
                <a href="https://github.com/nerolation">@nerolation</a>), Ben
                DiFrancesco&nbsp;(
                <a href="https://github.com/apbendi">@apbendi</a>), Vitalik
                Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Gary
                Ghayrat&nbsp;(
                <a href="https://github.com/garyghayrat">@garyghayrat</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6672">6672</a>
              </td>

              <td className="title">Multi-redeemable NFTs</td>
              <td className="author">
                RE:DREAMER Lab&nbsp;&lt;
                <a href="mailto:dev@redreamer.io">dev@redreamer.io</a>&gt;,
                Archie Chang (@ArchieR7)&nbsp;&lt;
                <a href="mailto:archie@redreamer.io">archie@redreamer.io</a>
                &gt;, Kai Yu (@chihkaiyu)&nbsp;&lt;
                <a href="mailto:kai@redreamer.io">kai@redreamer.io</a>&gt;,
                Yonathan Randyanto (@Randyanto)&nbsp;&lt;
                <a href="mailto:randy@redreamer.io">randy@redreamer.io</a>&gt;,
                Boyu Chu (@chuboyu)&nbsp;&lt;
                <a href="mailto:boyu@redreamer.io">boyu@redreamer.io</a>&gt;,
                Boxi Li (@boxi79)&nbsp;&lt;
                <a href="mailto:boxi@redreamer.io">boxi@redreamer.io</a>&gt;,
                Jason Cheng (@JasonCheng0729)&nbsp;&lt;
                <a href="mailto:jason@redreamer.io">jason@redreamer.io</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6780">6780</a>
              </td>

              <td className="title">SELFDESTRUCT only in same transaction</td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Vitalik
                Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Dankrad
                Feist&nbsp;(<a href="https://github.com/dankrad">@dankrad</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6808">6808</a>
              </td>

              <td className="title">Fungible Key Bound Token</td>
              <td className="author">
                Mihai Onila&nbsp;(
                <a href="https://github.com/MihaiORO">@MihaiORO</a>), Nick
                Zeman&nbsp;(<a href="https://github.com/NickZCZ">@NickZCZ</a>),
                Narcis Cotaie&nbsp;(
                <a href="https://github.com/NarcisCRO">@NarcisCRO</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6809">6809</a>
              </td>

              <td className="title">Non-Fungible Key Bound Token</td>
              <td className="author">
                Mihai Onila&nbsp;(
                <a href="https://github.com/MihaiORO">@MihaiORO</a>), Nick
                Zeman&nbsp;(<a href="https://github.com/NickZCZ">@NickZCZ</a>),
                Narcis Cotaie&nbsp;(
                <a href="https://github.com/NarcisCRO">@NarcisCRO</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6953">6953</a>
              </td>

              <td className="title">Network Upgrade Activation Triggers</td>
              <td className="author">
                Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>)
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
                Moxey&nbsp;(<a href="https://github.com/jxom">@jxom</a>), Pierre
                Bertet&nbsp;(<a href="https://github.com/bpierre">@bpierre</a>),
                Darryl Yeo&nbsp;(
                <a href="https://github.com/darrylyeo">@darrylyeo</a>), Yaroslav
                Sergievsky&nbsp;(
                <a href="https://github.com/everdimension">@everdimension</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6982">6982</a>
              </td>

              <td className="title">Efficient Default Lockable Tokens</td>
              <td className="author">
                Francesco Sullo&nbsp;(
                <a href="https://github.com/sullof">@sullof</a>), Alexe
                Spataru&nbsp;(<a href="https://github.com/urataps">@urataps</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7044">7044</a>
              </td>

              <td className="title">
                Perpetually Valid Signed Voluntary Exits
              </td>
              <td className="author">
                Lion&nbsp;(<a href="https://github.com/dapplion">@dapplion</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7045">7045</a>
              </td>

              <td className="title">Increase max attestation inclusion slot</td>
              <td className="author">
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7053">7053</a>
              </td>

              <td className="title">Interoperable Digital Media Indexing</td>
              <td className="author">
                Bofu Chen&nbsp;(<a href="https://github.com/bafu">@bafu</a>),
                Tammy Yang&nbsp;(
                <a href="https://github.com/tammyyang">@tammyyang</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7066">7066</a>
              </td>

              <td className="title">Lockable Extension for ERC-721</td>
              <td className="author">
                Piyush Chittara&nbsp;(
                <a href="https://github.com/piyush-chittara">
                  @piyush-chittara
                </a>
                ), StreamNFT&nbsp;(
                <a href="https://github.com/streamnft-tech">@streamnft-tech</a>
                ), Srinivas Joshi&nbsp;(
                <a href="https://github.com/SrinivasJoshi">@SrinivasJoshi</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7092">7092</a>
              </td>

              <td className="title">Financial Bonds</td>
              <td className="author">
                Samuel Gwlanold Edoumou&nbsp;(
                <a href="https://github.com/Edoumou">@Edoumou</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7160">7160</a>
              </td>

              <td className="title">ERC-721 Multi-Metadata Extension</td>
              <td className="author">
                0xG&nbsp;(<a href="https://github.com/0xGh">@0xGh</a>), Marco
                Peyfuss&nbsp;(
                <a href="https://github.com/mpeyfuss">@mpeyfuss</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7201">7201</a>
              </td>

              <td className="title">Namespaced Storage Layout</td>
              <td className="author">
                Francisco Giordano&nbsp;(
                <a href="https://github.com/frangio">@frangio</a>), Hadrien
                Croubois&nbsp;(<a href="https://github.com/Amxx">@Amxx</a>),
                Ernesto García&nbsp;(
                <a href="https://github.com/ernestognw">@ernestognw</a>), Eric
                Lau&nbsp;(<a href="https://github.com/ericglau">@ericglau</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7231">7231</a>
              </td>

              <td className="title">Identity-aggregated NFT</td>
              <td className="author">
                Chloe Gu&nbsp;&lt;
                <a href="mailto:chloe@carv.io">chloe@carv.io</a>&gt;, Navid
                X.&nbsp;(
                <a href="https://github.com/xuxinlai2002">@xuxinlai2002</a>),
                Victor Yu&nbsp;&lt;
                <a href="mailto:victor@carv.io">victor@carv.io</a>&gt;, Archer
                H.
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7329">7329</a>
              </td>

              <td className="title">ERC/EIP Repository split</td>
              <td className="author">
                Lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>),
                Danno Ferrin&nbsp;(
                <a href="https://github.com/shemnon">@shemnon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7401">7401</a>
              </td>

              <td className="title">
                Parent-Governed Non-Fungible Tokens Nesting
              </td>
              <td className="author">
                Bruno Škvorc&nbsp;(
                <a href="https://github.com/Swader">@Swader</a>), Cicada&nbsp;(
                <a href="https://github.com/CicadaNCR">@CicadaNCR</a>), Steven
                Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Stevan
                Bogosavljevic&nbsp;(
                <a href="https://github.com/stevyhacker">@stevyhacker</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7409">7409</a>
              </td>

              <td className="title">
                Public Non-Fungible Tokens Emote Repository
              </td>
              <td className="author">
                Bruno Škvorc&nbsp;(
                <a href="https://github.com/Swader">@Swader</a>), Steven
                Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Stevan
                Bogosavljevic&nbsp;(
                <a href="https://github.com/stevyhacker">@stevyhacker</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7439">7439</a>
              </td>

              <td className="title">Prevent ticket touting</td>
              <td className="author">
                LeadBest Consulting Group&nbsp;&lt;
                <a href="mailto:service@getoken.io">service@getoken.io</a>&gt;,
                Sandy Sung&nbsp;(
                <a href="https://github.com/sandy-sung-lb">@sandy-sung-lb</a>),
                Mars Peng&nbsp;&lt;
                <a href="mailto:mars.peng@getoken.io">mars.peng@getoken.io</a>
                &gt;, Taien Wang&nbsp;&lt;
                <a href="mailto:taien.wang@getoken.io">taien.wang@getoken.io</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7514">7514</a>
              </td>

              <td className="title">Add Max Epoch Churn Limit</td>
              <td className="author">
                dapplion&nbsp;(
                <a href="https://github.com/dapplion">@dapplion</a>), Tim
                Beiko&nbsp;(<a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7516">7516</a>
              </td>

              <td className="title">BLOBBASEFEE instruction</td>
              <td className="author">
                Carl Beekhuizen&nbsp;(
                <a href="https://github.com/carlbeek">@carlbeek</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7528">7528</a>
              </td>

              <td className="title">ETH (Native Asset) Address Convention</td>
              <td className="author">
                Joey Santoro&nbsp;(
                <a href="https://github.com/joeysantoro">@joeysantoro</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7535">7535</a>
              </td>

              <td className="title">Native Asset ERC-4626 Tokenized Vault</td>
              <td className="author">
                Joey Santoro&nbsp;(
                <a href="https://github.com/joeysantoro">@joeysantoro</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7540">7540</a>
              </td>

              <td className="title">Asynchronous ERC-4626 Tokenized Vaults</td>
              <td className="author">
                Jeroen Offerijns&nbsp;(
                <a href="https://github.com/hieronx">@hieronx</a>), Alina
                Sinelnikova&nbsp;(
                <a href="https://github.com/ilinzweilin">@ilinzweilin</a>),
                Vikram Arun&nbsp;(
                <a href="https://github.com/vikramarun">@vikramarun</a>), Joey
                Santoro&nbsp;(
                <a href="https://github.com/joeysantoro">@joeysantoro</a>),
                Farhaan Ali&nbsp;(
                <a href="https://github.com/0xfarhaan">@0xfarhaan</a>), João
                Martins&nbsp;(
                <a href="https://github.com/0xTimepunk">@0xTimepunk</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7568">7568</a>
              </td>

              <td className="title">
                Hardfork Meta Backfill - Berlin to Shapella
              </td>
              <td className="author">
                Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7569">7569</a>
              </td>

              <td className="title">Hardfork Meta - Dencun</td>
              <td className="author">
                Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7575">7575</a>
              </td>

              <td className="title">Multi-Asset ERC-4626 Vaults</td>
              <td className="author">
                Jeroen Offerijns&nbsp;(
                <a href="https://github.com/hieronx">@hieronx</a>), Alina
                Sinelnikova&nbsp;(
                <a href="https://github.com/ilinzweilin">@ilinzweilin</a>),
                Vikram Arun&nbsp;(
                <a href="https://github.com/vikramarun">@vikramarun</a>), Joey
                Santoro&nbsp;(
                <a href="https://github.com/joeysantoro">@joeysantoro</a>),
                Farhaan Ali&nbsp;(
                <a href="https://github.com/0xfarhaan">@0xfarhaan</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7636">7636</a>
              </td>

              <td className="title">
                Extension of EIP-778 for "client" ENR Entry
              </td>
              <td className="author">
                James Kempton&nbsp;(
                <a href="https://github.com/JKincorperated">@JKincorperated</a>)
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
                <a href="/EIPS/eip-1191">1191</a>
              </td>

              <td className="date">2019-11-18</td>

              <td className="title">
                Add chain id to mixed-case checksum address encoding
              </td>
              <td className="author">
                Juliano Rizzo&nbsp;(<a href="https://github.com/juli">@juli</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2266">2266</a>
              </td>

              <td className="date">2020-12-31</td>

              <td className="title">
                Atomic Swap-based American Call Option Contract Standard
              </td>
              <td className="author">
                Runchao Han&nbsp;&lt;
                <a href="mailto:runchao.han@monash.edu">
                  runchao.han@monash.edu
                </a>
                &gt;, Haoyu Lin&nbsp;&lt;
                <a href="mailto:chris.haoyul@gmail.com">
                  chris.haoyul@gmail.com
                </a>
                &gt;, Jiangshan Yu&nbsp;&lt;
                <a href="mailto:jiangshan.yu@monash.edu">
                  jiangshan.yu@monash.edu
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3076">3076</a>
              </td>

              <td className="date">2021-11-03</td>

              <td className="title">Slashing Protection Interchange Format</td>
              <td className="author">
                Michael Sproul&nbsp;(
                <a href="https://github.com/michaelsproul">@michaelsproul</a>),
                Sacha Saint-Leger&nbsp;(
                <a href="https://github.com/sachayves">@sachayves</a>), Danny
                Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5008">5008</a>
              </td>

              <td className="date">2023-08-15</td>

              <td className="title">ERC-721 Nonce Extension</td>
              <td className="author">
                Anders&nbsp;(<a href="https://github.com/0xanders">@0xanders</a>
                ), Lance&nbsp;(
                <a href="https://github.com/LanceSnow">@LanceSnow</a>),
                Shrug&nbsp;&lt;
                <a href="mailto:shrug@emojidao.org">shrug@emojidao.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5114">5114</a>
              </td>

              <td className="date">2023-09-19</td>

              <td className="title">Soulbound Badge</td>
              <td className="author">
                Micah Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5164">5164</a>
              </td>

              <td className="date">2023-11-15</td>

              <td className="title">Cross-Chain Execution</td>
              <td className="author">
                Brendan Asselstine&nbsp;(
                <a href="https://github.com/asselstine">@asselstine</a>),
                Pierrick Turelier&nbsp;(
                <a href="https://github.com/PierrickGT">@PierrickGT</a>), Chris
                Whinfrey&nbsp;(
                <a href="https://github.com/cwhinfrey">@cwhinfrey</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5216">5216</a>
              </td>

              <td className="date">2022-11-12</td>

              <td className="title">ERC-1155 Allowance Extension</td>
              <td className="author">
                Iván Mañús&nbsp;(
                <a href="https://github.com/ivanmmurciaua">@ivanmmurciaua</a>),
                Juan Carlos Cantó&nbsp;(
                <a href="https://github.com/EscuelaCryptoES">
                  @EscuelaCryptoES
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5453">5453</a>
              </td>

              <td className="date">2023-09-27</td>

              <td className="title">Endorsement - Permit for Any Functions</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5496">5496</a>
              </td>

              <td className="date">2022-11-29</td>

              <td className="title">
                Multi-privilege Management NFT Extension
              </td>
              <td className="author">
                Jeremy Z&nbsp;(<a href="https://github.com/wnft">@wnft</a>)
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
                <a href="https://github.com/moodysalem">@moodysalem</a>), Lukas
                Rosario&nbsp;(
                <a href="https://github.com/lukasrosario">@lukasrosario</a>),
                Wilson Cusack&nbsp;(
                <a href="https://github.com/wilsoncusack">@wilsoncusack</a>),
                Dror Tirosh&nbsp;(
                <a href="https://github.com/drortirosh">@drortirosh</a>), Jake
                Moxey&nbsp;(<a href="https://github.com/jxom">@jxom</a>), Derek
                Rein&nbsp;(<a href="https://github.com/arein">@arein</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6093">6093</a>
              </td>

              <td className="date">2023-08-15</td>

              <td className="title">Custom errors for commonly-used tokens</td>
              <td className="author">
                Ernesto García&nbsp;(
                <a href="https://github.com/ernestognw">@ernestognw</a>),
                Francisco Giordano&nbsp;(
                <a href="https://github.com/frangio">@frangio</a>), Hadrien
                Croubois&nbsp;(<a href="https://github.com/Amxx">@Amxx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6357">6357</a>
              </td>

              <td className="date">2023-11-10</td>

              <td className="title">Single-contract Multi-delegatecall</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7523">7523</a>
              </td>

              <td className="date">2024-03-26</td>

              <td className="title">Empty accounts deprecation</td>
              <td className="author">
                Peter Davies&nbsp;(
                <a href="https://github.com/petertdavies">@petertdavies</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7587">7587</a>
              </td>

              <td className="date">2024-04-25</td>

              <td className="title">
                Reserve Precompile Address Range for RIPs
              </td>
              <td className="author">
                Carl Beekhuizen&nbsp;(
                <a href="https://github.com/carlbeek">@carlbeek</a>), Ansgar
                Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>), Danny
                Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>), Tim
                Beiko&nbsp;(<a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>
          </tbody>
        </table>
        <h2 id="review">Review</h2>
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
                <a href="/EIPS/eip-663">663</a>
              </td>

              <td className="title">SWAPN, DUPN and EXCHANGE instructions</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Charles
                Cooper&nbsp;(
                <a href="https://github.com/charles-cooper">@charles-cooper</a>
                ), Danno Ferrin&nbsp;(
                <a href="https://github.com/shemnon">@shemnon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1185">1185</a>
              </td>

              <td className="title">Storage of DNS Records in ENS</td>
              <td className="author">
                Jim McDonald&nbsp;(<a href="https://github.com/mcdee">@mcdee</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2537">2537</a>
              </td>

              <td className="title">
                Precompile for BLS12-381 curve operations
              </td>
              <td className="author">
                Alex Vlasov&nbsp;(
                <a href="https://github.com/shamatar">@shamatar</a>), Kelly
                Olson&nbsp;(
                <a href="https://github.com/ineffectualproperty">
                  @ineffectualproperty
                </a>
                ), Alex Stokes&nbsp;(
                <a href="https://github.com/ralexstokes">@ralexstokes</a>),
                Antonio Sanso&nbsp;(
                <a href="https://github.com/asanso">@asanso</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2935">2935</a>
              </td>

              <td className="title">
                Serve historical block hashes from state
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Tomasz
                Stanczak&nbsp;(
                <a href="https://github.com/tkstanczak">@tkstanczak</a>),
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Gajinder
                Singh&nbsp;(<a href="https://github.com/g11tech">@g11tech</a>),
                Tanishq Jasoria&nbsp;(
                <a href="https://github.com/tanishqjasoria">@tanishqjasoria</a>
                ), Ignacio Hagopian&nbsp;(
                <a href="https://github.com/jsign">@jsign</a>), Jochem
                Brouwer&nbsp;(
                <a href="https://github.com/jochem-brouwer">@jochem-brouwer</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3074">3074</a>
              </td>

              <td className="title">AUTH and AUTHCALL opcodes</td>
              <td className="author">
                Sam Wilson&nbsp;(
                <a href="https://github.com/SamWilsn">@SamWilsn</a>), Ansgar
                Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>), Matt
                Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>),
                Micah Zoltu&nbsp;(
                <a href="https://github.com/micahzoltu">@micahzoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3540">3540</a>
              </td>

              <td className="title">EOF - EVM Object Format v1</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>), Matt
                Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3670">3670</a>
              </td>

              <td className="title">EOF - Code Validation</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Andrei
                Maiboroda&nbsp;(<a href="https://github.com/gumb0">@gumb0</a>),
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4200">4200</a>
              </td>

              <td className="title">EOF - Static relative jumps</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Andrei
                Maiboroda&nbsp;(<a href="https://github.com/gumb0">@gumb0</a>),
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4361">4361</a>
              </td>

              <td className="title">Sign-In with Ethereum</td>
              <td className="author">
                Wayne Chang&nbsp;(<a href="https://github.com/wyc">@wyc</a>),
                Gregory Rocco&nbsp;(
                <a href="https://github.com/obstropolos">@obstropolos</a>),
                Brantly Millegan&nbsp;(
                <a href="https://github.com/brantlymillegan">
                  @brantlymillegan
                </a>
                ), Nick Johnson&nbsp;(
                <a href="https://github.com/Arachnid">@Arachnid</a>), Oliver
                Terbu&nbsp;(<a href="https://github.com/awoie">@awoie</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4750">4750</a>
              </td>

              <td className="title">EOF - Functions</td>
              <td className="author">
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>),
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4824">4824</a>
              </td>

              <td className="title">Common Interfaces for DAOs</td>
              <td className="author">
                Joshua Tan&nbsp;(
                <a href="https://github.com/thelastjosh">@thelastjosh</a>),
                Isaac Patka&nbsp;(
                <a href="https://github.com/ipatka">@ipatka</a>), Ido
                Gershtein&nbsp;&lt;
                <a href="mailto:ido@daostack.io">ido@daostack.io</a>&gt;, Eyal
                Eithcowich&nbsp;&lt;
                <a href="mailto:eyal@deepdao.io">eyal@deepdao.io</a>&gt;,
                Michael Zargham&nbsp;(
                <a href="https://github.com/mzargham">@mzargham</a>), Sam
                Furter&nbsp;(<a href="https://github.com/nivida">@nivida</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4973">4973</a>
              </td>

              <td className="title">Account-bound Tokens</td>
              <td className="author">
                Tim Daubenschütz&nbsp;(
                <a href="https://github.com/TimDaub">@TimDaub</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5247">5247</a>
              </td>

              <td className="title">
                Smart Contract Executable Proposal Interface
              </td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5269">5269</a>
              </td>

              <td className="title">ERC Detection and Discovery</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5289">5289</a>
              </td>

              <td className="title">Ethereum Notary Interface</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5450">5450</a>
              </td>

              <td className="title">EOF - Stack Validation</td>
              <td className="author">
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Danno
                Ferrin&nbsp;(<a href="https://github.com/shemnon">@shemnon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5568">5568</a>
              </td>

              <td className="title">Well-Known Format for Required Actions</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5625">5625</a>
              </td>

              <td className="title">
                NFT Metadata JSON Schema dStorage Extension
              </td>
              <td className="author">
                Gavin Fu&nbsp;(<a href="https://github.com/gavfu">@gavfu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5639">5639</a>
              </td>

              <td className="title">Delegation Registry</td>
              <td className="author">
                foobar&nbsp;(<a href="https://github.com/0xfoobar">@0xfoobar</a>
                ), Wilkins Chung (@wwhchung)&nbsp;&lt;
                <a href="mailto:wilkins@manifold.xyz">wilkins@manifold.xyz</a>
                &gt;, ryley-o&nbsp;(
                <a href="https://github.com/ryley-o">@ryley-o</a>), Jake
                Rockland&nbsp;(
                <a href="https://github.com/jakerockland">@jakerockland</a>),
                andy8052&nbsp;(
                <a href="https://github.com/andy8052">@andy8052</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5920">5920</a>
              </td>

              <td className="title">PAY opcode</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>), Zainan
                Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>), Sam
                Wilson&nbsp;(<a href="https://github.com/SamWilsn">@SamWilsn</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5982">5982</a>
              </td>

              <td className="title">Role-based Access Control</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6065">6065</a>
              </td>

              <td className="title">Real Estate Token</td>
              <td className="author">
                Alex&nbsp;(
                <a href="https://github.com/Alex-Klasma">@Alex-Klasma</a>), Ben
                Fusek&nbsp;(<a href="https://github.com/bfusek">@bfusek</a>),
                Daniel Fallon-Cyr&nbsp;(
                <a href="https://github.com/dfalloncyr">@dfalloncyr</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6110">6110</a>
              </td>

              <td className="title">Supply validator deposits on chain</td>
              <td className="author">
                Mikhail Kalinin&nbsp;(
                <a href="https://github.com/mkalinin">@mkalinin</a>), Danny
                Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>),
                Peter Davies&nbsp;(
                <a href="https://github.com/petertdavies">@petertdavies</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6120">6120</a>
              </td>

              <td className="title">Universal Token Router</td>
              <td className="author">
                Derivable&nbsp;(
                <a href="https://github.com/derivable-labs">@derivable-labs</a>
                ), Zergity&nbsp;(
                <a href="https://github.com/Zergity">@Zergity</a>), Ngo Quang
                Anh&nbsp;(<a href="https://github.com/anhnq82">@anhnq82</a>),
                BerlinP&nbsp;(<a href="https://github.com/BerlinP">@BerlinP</a>
                ), Khanh Pham&nbsp;(
                <a href="https://github.com/blackskin18">@blackskin18</a>), Hal
                Blackburn&nbsp;(<a href="https://github.com/h4l">@h4l</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6206">6206</a>
              </td>

              <td className="title">EOF - JUMPF and non-returning functions</td>
              <td className="author">
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>),
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>), Matt
                Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6224">6224</a>
              </td>

              <td className="title">Contracts Dependencies Registry</td>
              <td className="author">
                Artem Chystiakov&nbsp;(
                <a href="https://github.com/arvolear">@arvolear</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6315">6315</a>
              </td>

              <td className="title">ERC-2771 Namespaced Account Abstraction</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6358">6358</a>
              </td>

              <td className="title">
                Cross-Chain Token States Synchronization
              </td>
              <td className="author">
                Shawn Zheng&nbsp;(
                <a href="https://github.com/xiyu1984">@xiyu1984</a>), Jason
                Cheng&nbsp;&lt;
                <a href="mailto:chengjingxx@gmail.com">chengjingxx@gmail.com</a>
                &gt;, George Huang&nbsp;(
                <a href="https://github.com/virgil2019">@virgil2019</a>), Kay
                Lin&nbsp;(<a href="https://github.com/kay404">@kay404</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6366">6366</a>
              </td>

              <td className="title">Permission Token</td>
              <td className="author">
                Chiro&nbsp;(
                <a href="https://github.com/chiro-hiro">@chiro-hiro</a>), Victor
                Dusart&nbsp;(<a href="https://github.com/vdusart">@vdusart</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6372">6372</a>
              </td>

              <td className="title">Contract clock</td>
              <td className="author">
                Hadrien Croubois&nbsp;(
                <a href="https://github.com/Amxx">@Amxx</a>), Francisco
                Giordano&nbsp;(<a href="https://github.com/frangio">@frangio</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6404">6404</a>
              </td>

              <td className="title">SSZ Transactions Root</td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>),
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6465">6465</a>
              </td>

              <td className="title">SSZ Withdrawals Root</td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>),
                Mikhail Kalinin&nbsp;(
                <a href="https://github.com/mkalinin">@mkalinin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6466">6466</a>
              </td>

              <td className="title">SSZ Receipts Root</td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>),
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6493">6493</a>
              </td>

              <td className="title">SSZ Transaction Signature Scheme</td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>), Matt
                Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>),
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6551">6551</a>
              </td>

              <td className="title">Non-fungible Token Bound Accounts</td>
              <td className="author">
                Jayden Windle&nbsp;(
                <a href="https://github.com/jaydenwindle">@jaydenwindle</a>),
                Benny Giang&nbsp;&lt;
                <a href="mailto:bg@futureprimitive.xyz">
                  bg@futureprimitive.xyz
                </a>
                &gt;, Steve Jang, Druzy Downs&nbsp;(
                <a href="https://github.com/druzydowns">@druzydowns</a>),
                Raymond Huynh&nbsp;(
                <a href="https://github.com/huynhr">@huynhr</a>), Alanah
                Lam&nbsp;&lt;
                <a href="mailto:alanah@futureprimitive.xyz">
                  alanah@futureprimitive.xyz
                </a>
                &gt;, Wilkins Chung (@wwhchung)&nbsp;&lt;
                <a href="mailto:wilkins@manifold.xyz">wilkins@manifold.xyz</a>
                &gt;, Paul Sullivan (@sullivph)&nbsp;&lt;
                <a href="mailto:paul.sullivan@manifold.xyz">
                  paul.sullivan@manifold.xyz
                </a>
                &gt;, Auryn Macmillan&nbsp;(
                <a href="https://github.com/auryn-macmillan">
                  @auryn-macmillan
                </a>
                ), Jan-Felix Schwarz&nbsp;(
                <a href="https://github.com/jfschwarz">@jfschwarz</a>), Anton
                Bukov&nbsp;(<a href="https://github.com/k06a">@k06a</a>),
                Mikhail Melnik&nbsp;(
                <a href="https://github.com/ZumZoom">@ZumZoom</a>), Josh
                Weintraub (@jhweintraub)&nbsp;&lt;
                <a href="mailto:jhweintraub@gmail.com">jhweintraub@gmail.com</a>
                &gt;, Rob Montgomery (@RobAnon)&nbsp;&lt;
                <a href="mailto:rob@revest.finance">rob@revest.finance</a>&gt;,
                vectorized&nbsp;(
                <a href="https://github.com/vectorized">@vectorized</a>), Víctor
                Martínez&nbsp;(<a href="https://github.com/vnmrtz">@vnmrtz</a>),
                Adrián Pajares&nbsp;(
                <a href="https://github.com/0xadrii">@0xadrii</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6596">6596</a>
              </td>

              <td className="title">Cultural and Historical Asset Token</td>
              <td className="author">
                Phillip Pon&nbsp;&lt;
                <a href="mailto:phillip@artifactlabs.com">
                  phillip@artifactlabs.com
                </a>
                &gt;, Gary Liu&nbsp;&lt;
                <a href="mailto:gary@artifactlabs.com">gary@artifactlabs.com</a>
                &gt;, Henry Chan&nbsp;&lt;
                <a href="mailto:henry@artifactlabs.com">
                  henry@artifactlabs.com
                </a>
                &gt;, Joey Liu&nbsp;&lt;
                <a href="mailto:joey@artifactlabs.com">joey@artifactlabs.com</a>
                &gt;, Lauren Ho&nbsp;&lt;
                <a href="mailto:lauren@artifactlabs.com">
                  lauren@artifactlabs.com
                </a>
                &gt;, Jeff Leung&nbsp;&lt;
                <a href="mailto:jeff@artifactlabs.com">jeff@artifactlabs.com</a>
                &gt;, Brian Liang&nbsp;&lt;
                <a href="mailto:brian@artifactlabs.com">
                  brian@artifactlabs.com
                </a>
                &gt;, Joyce Li&nbsp;&lt;
                <a href="mailto:joyce@artifactlabs.com">
                  joyce@artifactlabs.com
                </a>
                &gt;, Avir Mahtani&nbsp;&lt;
                <a href="mailto:avir@artifactlabs.com">avir@artifactlabs.com</a>
                &gt;, Antoine Cote&nbsp;(
                <a href="https://github.com/acote88">@acote88</a>), David
                Leung&nbsp;(<a href="https://github.com/dhl">@dhl</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6617">6617</a>
              </td>

              <td className="title">Bit Based Permission</td>
              <td className="author">
                Chiro&nbsp;(
                <a href="https://github.com/chiro-hiro">@chiro-hiro</a>), Victor
                Dusart&nbsp;(<a href="https://github.com/vdusart">@vdusart</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6916">6916</a>
              </td>

              <td className="title">Automatically Reset Testnet</td>
              <td className="author">
                Mário Havel&nbsp;(
                <a href="https://github.com/taxmeifyoucan">@taxmeifyoucan</a>),
                pk910&nbsp;(<a href="https://github.com/pk910">@pk910</a>), Rémy
                Roy&nbsp;(<a href="https://github.com/remyroy">@remyroy</a>),
                Holly Atkinson&nbsp;(
                <a href="https://github.com/atkinsonholly">@atkinsonholly</a>),
                Tereza Burianova&nbsp;(
                <a href="https://github.com/T-ess">@T-ess</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6956">6956</a>
              </td>

              <td className="title">Asset-bound Non-Fungible Tokens</td>
              <td className="author">
                Thomas Bergmueller&nbsp;(
                <a href="https://github.com/tbergmueller">@tbergmueller</a>),
                Lukas Meyer&nbsp;(
                <a href="https://github.com/ibex-technology">
                  @ibex-technology
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6997">6997</a>
              </td>

              <td className="title">
                ERC-721 with transaction validation step.
              </td>
              <td className="author">
                Eduard López i Fina&nbsp;(
                <a href="https://github.com/eduardfina">@eduardfina</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7002">7002</a>
              </td>

              <td className="title">Execution layer triggerable withdrawals</td>
              <td className="author">
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                ), Mikhail Kalinin&nbsp;(
                <a href="https://github.com/mkalinin">@mkalinin</a>), Ansgar
                Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>),
                Hsiao-Wei Wang&nbsp;(
                <a href="https://github.com/hwwhww">@hwwhww</a>),
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7007">7007</a>
              </td>

              <td className="title">Verifiable AI-Generated Content Token</td>
              <td className="author">
                Cathie So&nbsp;(
                <a href="https://github.com/socathie">@socathie</a>), Xiaohang
                Yu&nbsp;(
                <a href="https://github.com/xhyumiracle">@xhyumiracle</a>),
                Conway&nbsp;(<a href="https://github.com/0x1cc">@0x1cc</a>), Lee
                Ting Ting&nbsp;(
                <a href="https://github.com/tina1998612">@tina1998612</a>),
                Kartin&nbsp;&lt;
                <a href="mailto:kartin@hyperoracle.io">kartin@hyperoracle.io</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7015">7015</a>
              </td>

              <td className="title">NFT Creator Attribution</td>
              <td className="author">
                indreams&nbsp;(
                <a href="https://github.com/strollinghome">@strollinghome</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7069">7069</a>
              </td>

              <td className="title">Revamped CALL instructions</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Danno Ferrin&nbsp;(
                <a href="https://github.com/shemnon">@shemnon</a>), Andrei
                Maiboroda&nbsp;(<a href="https://github.com/gumb0">@gumb0</a>),
                Charles Cooper&nbsp;(
                <a href="https://github.com/charles-cooper">@charles-cooper</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7144">7144</a>
              </td>

              <td className="title">
                ERC-20 with transaction validation step.
              </td>
              <td className="author">
                Eduard López i Fina&nbsp;(
                <a href="https://github.com/eduardfina">@eduardfina</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7212">7212</a>
              </td>

              <td className="title">Precompile for secp256r1 Curve Support</td>
              <td className="author">
                Ulaş Erdoğan&nbsp;(
                <a href="https://github.com/ulerdogan">@ulerdogan</a>), Doğan
                Alpaslan&nbsp;(
                <a href="https://github.com/doganalpaslan">@doganalpaslan</a>),
                DC Posch&nbsp;(<a href="https://github.com/dcposch">@dcposch</a>
                ), Nalin Bhardwaj&nbsp;(
                <a href="https://github.com/nalinbhardwaj">@nalinbhardwaj</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7251">7251</a>
              </td>

              <td className="title">Increase the MAX_EFFECTIVE_BALANCE</td>
              <td className="author">
                mike&nbsp;(
                <a href="https://github.com/michaelneuder">@michaelneuder</a>),
                Francesco&nbsp;(
                <a href="https://github.com/fradamt">@fradamt</a>),
                dapplion&nbsp;(
                <a href="https://github.com/dapplion">@dapplion</a>),
                Mikhail&nbsp;(
                <a href="https://github.com/mkalinin">@mkalinin</a>),
                Aditya&nbsp;(<a href="https://github.com/adiasg">@adiasg</a>),
                Justin&nbsp;(
                <a href="https://github.com/justindrake">@justindrake</a>),
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7432">7432</a>
              </td>

              <td className="title">Non-Fungible Token Roles</td>
              <td className="author">
                Ernani São Thiago&nbsp;(
                <a href="https://github.com/ernanirst">@ernanirst</a>), Daniel
                Lima&nbsp;(<a href="https://github.com/karacurt">@karacurt</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7480">7480</a>
              </td>

              <td className="title">EOF - Data section access instructions</td>
              <td className="author">
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>),
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7495">7495</a>
              </td>

              <td className="title">SSZ StableContainer</td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>),
                Cayman&nbsp;(
                <a href="https://github.com/wemeetagain">@wemeetagain</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7531">7531</a>
              </td>

              <td className="title">Staked ERC-721 Ownership Recognition</td>
              <td className="author">
                Francesco Sullo&nbsp;(
                <a href="https://github.com/sullof">@sullof</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7547">7547</a>
              </td>

              <td className="title">Inclusion lists</td>
              <td className="author">
                mike&nbsp;(
                <a href="https://github.com/michaelneuder">@michaelneuder</a>),
                Vitalik&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>),
                Francesco&nbsp;(
                <a href="https://github.com/fradamt">@fradamt</a>),
                Terence&nbsp;(
                <a href="https://github.com/terencechain">@terencechain</a>),
                potuz&nbsp;(<a href="https://github.com/potuz">@potuz</a>),
                Manav&nbsp;(
                <a href="https://github.com/manav2401">@manav2401</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7549">7549</a>
              </td>

              <td className="title">
                Move committee index outside Attestation
              </td>
              <td className="author">
                dapplion&nbsp;(
                <a href="https://github.com/dapplion">@dapplion</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7578">7578</a>
              </td>

              <td className="title">Physical Asset Redemption</td>
              <td className="author">
                Lee Vidor&nbsp;(<a href="https://github.com/V1d0r">@V1d0r</a>),
                David Tan&nbsp;&lt;
                <a href="mailto:david@emergentx.org">david@emergentx.org</a>
                &gt;, Lee Smith&nbsp;&lt;
                <a href="mailto:lee@emergentx.org">lee@emergentx.org</a>&gt;,
                Gabriel Stoica&nbsp;(
                <a href="https://github.com/gabrielstoica">@gabrielstoica</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7586">7586</a>
              </td>

              <td className="title">Interest Rate Swaps</td>
              <td className="author">
                Samuel Gwlanold Edoumou&nbsp;(
                <a href="https://github.com/Edoumou">@Edoumou</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7588">7588</a>
              </td>

              <td className="title">Blob Transactions Metadata JSON Schema</td>
              <td className="author">
                Gavin Fu&nbsp;(<a href="https://github.com/gavfu">@gavfu</a>),
                Leo Wang&nbsp;(
                <a href="https://github.com/wanglie1986">@wanglie1986</a>), Bova
                Chen&nbsp;(<a href="https://github.com/appoipp">@appoipp</a>),
                Aiden X&nbsp;(<a href="https://github.com/4ever9">@4ever9</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7590">7590</a>
              </td>

              <td className="title">ERC-20 Holder Extension for NFTs</td>
              <td className="author">
                Steven Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7594">7594</a>
              </td>

              <td className="title">
                PeerDAS - Peer Data Availability Sampling
              </td>
              <td className="author">
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                ), Dankrad Feist&nbsp;(
                <a href="https://github.com/dankrad">@dankrad</a>), Francesco
                D'Amato&nbsp;(<a href="https://github.com/fradamt">@fradamt</a>
                ), Hsiao-Wei Wang&nbsp;(
                <a href="https://github.com/hwwhww">@hwwhww</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7600">7600</a>
              </td>

              <td className="title">Hardfork Meta - Pectra</td>
              <td className="author">
                Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7620">7620</a>
              </td>

              <td className="title">EOF Contract Creation</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>), Piotr
                Dobaczewski&nbsp;(
                <a href="https://github.com/pdobacz">@pdobacz</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7623">7623</a>
              </td>

              <td className="title">Increase calldata cost</td>
              <td className="author">
                Toni Wahrstätter&nbsp;(
                <a href="https://github.com/nerolation">@nerolation</a>),
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7658">7658</a>
              </td>

              <td className="title">Light client data backfill</td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7685">7685</a>
              </td>

              <td className="title">
                General purpose execution layer requests
              </td>
              <td className="author">
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7688">7688</a>
              </td>

              <td className="title">
                Forward compatible consensus data structures
              </td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>),
                Cayman&nbsp;(
                <a href="https://github.com/wemeetagain">@wemeetagain</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7692">7692</a>
              </td>

              <td className="title">EVM Object Format (EOFv1) Meta</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>), Piotr
                Dobaczewski&nbsp;(
                <a href="https://github.com/pdobacz">@pdobacz</a>), Danno
                Ferrin&nbsp;(<a href="https://github.com/shemnon">@shemnon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7698">7698</a>
              </td>

              <td className="title">EOF - Creation transaction</td>
              <td className="author">
                Piotr Dobaczewski&nbsp;(
                <a href="https://github.com/pdobacz">@pdobacz</a>), Andrei
                Maiboroda&nbsp;(<a href="https://github.com/gumb0">@gumb0</a>),
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7702">7702</a>
              </td>

              <td className="title">Set EOA account code</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Sam
                Wilson&nbsp;(<a href="https://github.com/SamWilsn">@SamWilsn</a>
                ), Ansgar Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>), Matt
                Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
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
                <a href="/EIPS/eip-725">725</a>
              </td>

              <td className="title">
                General data key/value store and execution
              </td>
              <td className="author">
                Fabian Vogelsteller&nbsp;(
                <a href="https://github.com/frozeman">@frozeman</a>), Tyler
                Yasaka&nbsp;(
                <a href="https://github.com/tyleryasaka">@tyleryasaka</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-838">838</a>
              </td>

              <td className="title">
                ABI specification for REVERT reason string
              </td>
              <td className="author">
                Federico Bond&nbsp;(
                <a href="https://github.com/federicobond">@federicobond</a>),
                Renan Rodrigues de Souza&nbsp;(
                <a href="https://github.com/RenanSouza2">@RenanSouza2</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-998">998</a>
              </td>

              <td className="title">Composable Non-Fungible Token</td>
              <td className="author">
                Matt Lockyer&nbsp;&lt;
                <a href="mailto:mattdlockyer@gmail.com">
                  mattdlockyer@gmail.com
                </a>
                &gt;, Nick Mudge&nbsp;&lt;
                <a href="mailto:nick@perfectabstractions.com">
                  nick@perfectabstractions.com
                </a>
                &gt;, Jordan Schalm&nbsp;&lt;
                <a href="mailto:jordan.schalm@gmail.com">
                  jordan.schalm@gmail.com
                </a>
                &gt;, sebastian echeverry&nbsp;&lt;
                <a href="mailto:sebastian.echeverry@robotouniverse.com">
                  sebastian.echeverry@robotouniverse.com
                </a>
                &gt;, Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1202">1202</a>
              </td>

              <td className="title">Voting Interface</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>),
                Evan&nbsp;(<a href="https://github.com/evbots">@evbots</a>), Yin
                Xu&nbsp;(<a href="https://github.com/yingogobot">@yingogobot</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2539">2539</a>
              </td>

              <td className="title">BLS12-377 curve operations</td>
              <td className="author">
                Alex Vlasov&nbsp;(
                <a href="https://github.com/shamatar">@shamatar</a>),
                hujw77&nbsp;(<a href="https://github.com/hujw77">@hujw77</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4337">4337</a>
              </td>

              <td className="title">Account Abstraction Using Alt Mempool</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Yoav
                Weiss&nbsp;(<a href="https://github.com/yoavw">@yoavw</a>), Dror
                Tirosh&nbsp;(
                <a href="https://github.com/drortirosh">@drortirosh</a>), Shahaf
                Nacson&nbsp;(<a href="https://github.com/shahafn">@shahafn</a>),
                Alex Forshtat&nbsp;(
                <a href="https://github.com/forshtat">@forshtat</a>), Kristof
                Gazso&nbsp;(
                <a href="https://github.com/kristofgazso">@kristofgazso</a>),
                Tjaden Hess&nbsp;(
                <a href="https://github.com/tjade273">@tjade273</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4762">4762</a>
              </td>

              <td className="title">Statelessness gas cost changes</td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Vitalik
                Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Dankrad
                Feist&nbsp;(<a href="https://github.com/dankrad">@dankrad</a>),
                Ignacio Hagopian&nbsp;(
                <a href="https://github.com/jsign">@jsign</a>), Tanishq
                Jasoria&nbsp;(
                <a href="https://github.com/tanishqjasoria">@tanishqjasoria</a>
                ), Gajinder Singh&nbsp;(
                <a href="https://github.com/g11tech">@g11tech</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4883">4883</a>
              </td>

              <td className="title">Composable SVG NFT</td>
              <td className="author">
                Andrew B Coathup&nbsp;(
                <a href="https://github.com/abcoathup">@abcoathup</a>),
                Alex&nbsp;(
                <a href="https://github.com/AlexPartyPanda">@AlexPartyPanda</a>
                ), Damian Martinelli&nbsp;(
                <a href="https://github.com/damianmarti">@damianmarti</a>),
                blockdev&nbsp;(<a href="https://github.com/0xbok">@0xbok</a>),
                Austin Griffith&nbsp;(
                <a href="https://github.com/austintgriffith">
                  @austintgriffith
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4972">4972</a>
              </td>

              <td className="title">Name-Owned Account</td>
              <td className="author">
                Shu Dong&nbsp;(
                <a href="https://github.com/dongshu2013">@dongshu2013</a>), Qi
                Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>),
                Zihao Chen&nbsp;(
                <a href="https://github.com/zihaoccc">@zihaoccc</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5115">5115</a>
              </td>

              <td className="title">SY Token</td>
              <td className="author">
                Vu Nguyen&nbsp;(
                <a href="https://github.com/mrenoon">@mrenoon</a>), Long
                Vuong&nbsp;(
                <a href="https://github.com/UncleGrandpa925">
                  @UncleGrandpa925
                </a>
                ), Anton Buenavista&nbsp;(
                <a href="https://github.com/ayobuenavista">@ayobuenavista</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5173">5173</a>
              </td>

              <td className="title">NFT Future Rewards (nFR)</td>
              <td className="author">
                Yale ReiSoleil&nbsp;(
                <a href="https://github.com/longnshort">@longnshort</a>),
                dRadiant&nbsp;(
                <a href="https://github.com/dRadiant">@dRadiant</a>), D Wang,
                PhD&nbsp;&lt;<a href="mailto:david@iob.fi">david@iob.fi</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5189">5189</a>
              </td>

              <td className="title">
                Account Abstraction via Endorsed Operations
              </td>
              <td className="author">
                Agustín Aguilar&nbsp;(
                <a href="https://github.com/agusx1211">@agusx1211</a>), Philippe
                Castonguay&nbsp;(<a href="https://github.com/phabc">@phabc</a>),
                Michael Standen&nbsp;(
                <a href="https://github.com/ScreamingHawk">@ScreamingHawk</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5485">5485</a>
              </td>

              <td className="title">
                Legitimacy, Jurisdiction and Sovereignty
              </td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5573">5573</a>
              </td>

              <td className="title">
                Sign-In with Ethereum Capabilities, ReCaps
              </td>
              <td className="author">
                Oliver Terbu&nbsp;(<a href="https://github.com/awoie">@awoie</a>
                ), Jacob Ward&nbsp;(
                <a href="https://github.com/cobward">@cobward</a>), Charles
                Lehner&nbsp;(<a href="https://github.com/clehner">@clehner</a>),
                Sam Gbafa&nbsp;(
                <a href="https://github.com/skgbafa">@skgbafa</a>), Wayne
                Chang&nbsp;(<a href="https://github.com/wyc">@wyc</a>), Charles
                Cunningham&nbsp;(
                <a href="https://github.com/chunningham">@chunningham</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5604">5604</a>
              </td>

              <td className="title">NFT Lien</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>), Allen
                Zhou&nbsp;&lt;
                <a href="mailto:allen@ubiloan.io">allen@ubiloan.io</a>&gt;, Alex
                Qin&nbsp;&lt;
                <a href="mailto:alex@ubiloan.io">alex@ubiloan.io</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5700">5700</a>
              </td>

              <td className="title">Bindable Token Interface</td>
              <td className="author">
                Leeren&nbsp;(<a href="https://github.com/leeren">@leeren</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5727">5727</a>
              </td>

              <td className="title">Semi-Fungible Soulbound Token</td>
              <td className="author">
                Austin Zhu&nbsp;(
                <a href="https://github.com/AustinZhu">@AustinZhu</a>), Terry
                Chen&nbsp;&lt;
                <a href="mailto:terry.chen@phaneroz.io">
                  terry.chen@phaneroz.io
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5791">5791</a>
              </td>

              <td className="title">Physical Backed Tokens</td>
              <td className="author">
                2pmflow&nbsp;(<a href="https://github.com/2pmflow">@2pmflow</a>
                ), locationtba&nbsp;(
                <a href="https://github.com/locationtba">@locationtba</a>),
                Cameron Robertson&nbsp;(
                <a href="https://github.com/ccamrobertson">@ccamrobertson</a>),
                cygaar&nbsp;(<a href="https://github.com/cygaar">@cygaar</a>),
                Brian Weick&nbsp;(
                <a href="https://github.com/bweick">@bweick</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5806">5806</a>
              </td>

              <td className="title">Delegate transaction</td>
              <td className="author">
                Hadrien Croubois&nbsp;(
                <a href="https://github.com/Amxx">@Amxx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6123">6123</a>
              </td>

              <td className="title">Smart Derivative Contract</td>
              <td className="author">
                Christian Fries&nbsp;(
                <a href="https://github.com/cfries">@cfries</a>), Peter
                Kohl-Landgraf&nbsp;(
                <a href="https://github.com/pekola">@pekola</a>), Alexandros
                Korpis&nbsp;(<a href="https://github.com/kourouta">@kourouta</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6170">6170</a>
              </td>

              <td className="title">Cross-Chain Messaging Interface</td>
              <td className="author">
                Sujith Somraaj&nbsp;(
                <a href="https://github.com/sujithsomraaj">@sujithsomraaj</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6229">6229</a>
              </td>

              <td className="title">Tokenized Vaults with Lock-in Period</td>
              <td className="author">
                Anderson Chen&nbsp;(
                <a href="https://github.com/Ankarrr">@Ankarrr</a>), Martinet
                Lee&nbsp;&lt;
                <a href="mailto:martinetlee@gmail.com">martinetlee@gmail.com</a>
                &gt;, Anton Cheng&nbsp;&lt;
                <a href="mailto:antonassocareer@gmail.com">
                  antonassocareer@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6327">6327</a>
              </td>

              <td className="title">Elastic Signature</td>
              <td className="author">
                George&nbsp;(<a href="https://github.com/JXRow">@JXRow</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6604">6604</a>
              </td>

              <td className="title">Abstract Token</td>
              <td className="author">
                Chris Walker (@cr-walker)&nbsp;&lt;
                <a href="mailto:chris@ckwalker.com">chris@ckwalker.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6662">6662</a>
              </td>

              <td className="title">AA Account Metadata For Authentication</td>
              <td className="author">
                Shu Dong&nbsp;(
                <a href="https://github.com/dongshu2013">@dongshu2013</a>),
                Zihao Chen&nbsp;(
                <a href="https://github.com/zihaoccc">@zihaoccc</a>), Peter
                Chen&nbsp;(<a href="https://github.com/pette1999">@pette1999</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6682">6682</a>
              </td>

              <td className="title">NFT Flashloans</td>
              <td className="author">
                out.eth&nbsp;(
                <a href="https://github.com/outdoteth">@outdoteth</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6690">6690</a>
              </td>

              <td className="title">
                EVM Modular Arithmetic Extensions (EVMMAX)
              </td>
              <td className="author">
                Jared Wasinger&nbsp;(
                <a href="https://github.com/jwasinger">@jwasinger</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6734">6734</a>
              </td>

              <td className="title">L2 Token List</td>
              <td className="author">
                Kelvin Fichter&nbsp;(
                <a href="https://github.com/smartcontracts">@smartcontracts</a>
                ), Andreas Freund&nbsp;(
                <a href="https://github.com/Therecanbeonlyone1969">
                  @Therecanbeonlyone1969
                </a>
                ), Pavel Sinelnikov&nbsp;(
                <a href="https://github.com/psinelnikov">@psinelnikov</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6735">6735</a>
              </td>

              <td className="title">L2 Aliasing of EVM-based Addresses</td>
              <td className="author">
                Kelvin Fichter&nbsp;(
                <a href="https://github.com/smartcontracts">@smartcontracts</a>
                ), Andreas Freund&nbsp;(
                <a href="https://github.com/Therecanbeonlyone1969">
                  @Therecanbeonlyone1969
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6785">6785</a>
              </td>

              <td className="title">ERC-721 Utilities Information Extension</td>
              <td className="author">
                Otniel Nicola&nbsp;(
                <a href="https://github.com/OT-kthd">@OT-kthd</a>), Bogdan
                Popa&nbsp;(
                <a href="https://github.com/BogdanKTHD">@BogdanKTHD</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6786">6786</a>
              </td>

              <td className="title">Registry for royalties payment for NFTs</td>
              <td className="author">
                Otniel Nicola&nbsp;(
                <a href="https://github.com/OT-kthd">@OT-kthd</a>), Bogdan
                Popa&nbsp;(
                <a href="https://github.com/BogdanKTHD">@BogdanKTHD</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6787">6787</a>
              </td>

              <td className="title">
                Order Book DEX with Two Phase Withdrawal
              </td>
              <td className="author">
                Jessica&nbsp;(
                <a href="https://github.com/qizheng09">@qizheng09</a>),
                Roy&nbsp;(<a href="https://github.com/royshang">@royshang</a>),
                Jun&nbsp;(
                <a href="https://github.com/SniperUsopp">@SniperUsopp</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6800">6800</a>
              </td>

              <td className="title">
                Ethereum state using a unified verkle tree
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Dankrad
                Feist&nbsp;(<a href="https://github.com/dankrad">@dankrad</a>),
                Kevaundray Wedderburn&nbsp;(
                <a href="https://github.com/kevaundray">@kevaundray</a>),
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Piper
                Merriam&nbsp;(
                <a href="https://github.com/pipermerriam">@pipermerriam</a>),
                Gottfried Herold&nbsp;(
                <a href="https://github.com/GottfriedHerold">
                  @GottfriedHerold
                </a>
                ), Ignacio Hagopian&nbsp;(
                <a href="https://github.com/jsign">@jsign</a>), Tanishq
                Jasoria&nbsp;(
                <a href="https://github.com/tanishqjasoria">@tanishqjasoria</a>
                ), Gajinder Singh&nbsp;(
                <a href="https://github.com/g11tech">@g11tech</a>), Danno
                Ferrin&nbsp;(<a href="https://github.com/shemnon">@shemnon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6806">6806</a>
              </td>

              <td className="title">ERC-721 Holding Time Tracking</td>
              <td className="author">
                Saitama&nbsp;(
                <a href="https://github.com/saitama2009">@saitama2009</a>),
                Combo&nbsp;&lt;
                <a href="mailto:combo@1combo.io">combo@1combo.io</a>&gt;,
                Luigi&nbsp;&lt;
                <a href="mailto:luigi@1combo.io">luigi@1combo.io</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6821">6821</a>
              </td>

              <td className="title">Support ENS Name for Web3 URL</td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>),
                Qiang Zhu&nbsp;(<a href="https://github.com/qzhodl">@qzhodl</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6823">6823</a>
              </td>

              <td className="title">Token Mapping Slot Retrieval Extension</td>
              <td className="author">
                qdqd (@qd-qd)&nbsp;&lt;
                <a href="mailto:qdqdqdqdqd@protonmail.com">
                  qdqdqdqdqd@protonmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6860">6860</a>
              </td>

              <td className="title">
                Web3 URL to EVM Call Message Translation
              </td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>),
                Chao Pi&nbsp;(
                <a href="https://github.com/pichaoqkc">@pichaoqkc</a>), Sam
                Wilson&nbsp;(<a href="https://github.com/SamWilsn">@SamWilsn</a>
                ), Nicolas Deschildre&nbsp;(
                <a href="https://github.com/nand2">@nand2</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6864">6864</a>
              </td>

              <td className="title">Upgradable Fungible Token</td>
              <td className="author">
                Jeff Huang&nbsp;(
                <a href="https://github.com/jeffishjeff">@jeffishjeff</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6865">6865</a>
              </td>

              <td className="title">On-Chain EIP-712 Visualization</td>
              <td className="author">
                Abderrahmen Hanafi&nbsp;(
                <a href="https://github.com/a6-dou">@a6-dou</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6900">6900</a>
              </td>

              <td className="title">
                Modular Smart Contract Accounts and Plugins
              </td>
              <td className="author">
                Adam Egyed&nbsp;(
                <a href="https://github.com/adamegyed">@adamegyed</a>), Fangting
                Liu&nbsp;(
                <a href="https://github.com/trinity-0111">@trinity-0111</a>),
                Jay Paik&nbsp;(<a href="https://github.com/jaypaik">@jaypaik</a>
                ), Yoav Weiss&nbsp;(
                <a href="https://github.com/yoavw">@yoavw</a>), Huawei Gu&nbsp;(
                <a href="https://github.com/huaweigu">@huaweigu</a>), Daniel
                Lim&nbsp;(
                <a href="https://github.com/dlim-circle">@dlim-circle</a>),
                Zhiyu Zhang&nbsp;(
                <a href="https://github.com/ZhiyuCircle">@ZhiyuCircle</a>),
                Ruben Koch&nbsp;(
                <a href="https://github.com/0xrubes">@0xrubes</a>), David
                Philipson&nbsp;(
                <a href="https://github.com/dphilipson">@dphilipson</a>), Howy
                Ho&nbsp;(<a href="https://github.com/howydev">@howydev</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6909">6909</a>
              </td>

              <td className="title">Minimal Multi-Token Interface</td>
              <td className="author">
                JT Riley&nbsp;(
                <a href="https://github.com/jtriley-eth">@jtriley-eth</a>),
                Dillon&nbsp;(<a href="https://github.com/d1ll0n">@d1ll0n</a>),
                Sara&nbsp;(
                <a href="https://github.com/snreynolds">@snreynolds</a>),
                Vectorized&nbsp;(
                <a href="https://github.com/Vectorized">@Vectorized</a>),
                Neodaoist&nbsp;(
                <a href="https://github.com/neodaoist">@neodaoist</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6913">6913</a>
              </td>

              <td className="title">SETCODE instruction</td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6914">6914</a>
              </td>

              <td className="title">Reuse Withdrawn Validator Indices</td>
              <td className="author">
                Lion&nbsp;(<a href="https://github.com/dapplion">@dapplion</a>),
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6932">6932</a>
              </td>

              <td className="title">Subscription-Based Token</td>
              <td className="author">
                360 Core&nbsp;&lt;
                <a href="mailto:hello@360coreinc.com">hello@360coreinc.com</a>
                &gt;, Robin Rajput&nbsp;(
                <a href="https://github.com/0xRobinR">@0xRobinR</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6944">6944</a>
              </td>

              <td className="title">ERC-5219 Resolve Mode</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>), Qi
                Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6960">6960</a>
              </td>

              <td className="title">Dual Layer Token</td>
              <td className="author">
                Adam Boudjemaa&nbsp;(
                <a href="https://github.com/aboudjem">@aboudjem</a>), Mohamad
                Hammoud&nbsp;(
                <a href="https://github.com/mohamadhammoud">@mohamadhammoud</a>
                ), Nawar Hisso&nbsp;(
                <a href="https://github.com/nawar-hisso">@nawar-hisso</a>),
                Khawla Hassan&nbsp;(
                <a href="https://github.com/khawlahssn">@khawlahssn</a>),
                Mohammad Zakeri Rad&nbsp;(
                <a href="https://github.com/zakrad">@zakrad</a>), Ashish
                Sood&nbsp;&lt;
                <a href="mailto:soodgen@gmail.com">soodgen@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6981">6981</a>
              </td>

              <td className="title">Reserved Ownership Accounts</td>
              <td className="author">
                Paul Sullivan (@sullivph)&nbsp;&lt;
                <a href="mailto:paul.sullivan@manifold.xyz">
                  paul.sullivan@manifold.xyz
                </a>
                &gt;, Wilkins Chung (@wwchung)&nbsp;&lt;
                <a href="mailto:wilkins@manifold.xyz">wilkins@manifold.xyz</a>
                &gt;, Kartik Patel (@Slokh)&nbsp;&lt;
                <a href="mailto:kartik@manifold.xyz">kartik@manifold.xyz</a>&gt;
              </td>
            </tr>

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
                <a href="/EIPS/eip-7085">7085</a>
              </td>

              <td className="title">NFT Relationship Enhancement</td>
              <td className="author">
                Guang&nbsp;(<a href="https://github.com/xg1990">@xg1990</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7087">7087</a>
              </td>

              <td className="title">MIME type for Web3 URL in Auto Mode</td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>),
                Nicolas Deschildre&nbsp;(
                <a href="https://github.com/nand2">@nand2</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7093">7093</a>
              </td>

              <td className="title">Social Recovery Interface</td>
              <td className="author">
                John Zhang&nbsp;(
                <a href="https://github.com/johnz1019">@johnz1019</a>), Davis
                Xiang&nbsp;(<a href="https://github.com/xcshuan">@xcshuan</a>),
                Kyle Xu&nbsp;(
                <a href="https://github.com/kylexyxu">@kylexyxu</a>), George
                Zhang&nbsp;(
                <a href="https://github.com/odysseus0">@odysseus0</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7196">7196</a>
              </td>

              <td className="title">Simple token, Simplified ERC-20</td>
              <td className="author">
                Xiang&nbsp;(
                <a href="https://github.com/wenzhenxiang">@wenzhenxiang</a>),
                Ben77&nbsp;(<a href="https://github.com/ben2077">@ben2077</a>),
                Mingshi S.&nbsp;(
                <a href="https://github.com/newnewsms">@newnewsms</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7204">7204</a>
              </td>

              <td className="title">Contract wallet management token</td>
              <td className="author">
                Xiang&nbsp;(
                <a href="https://github.com/wenzhenxiang">@wenzhenxiang</a>),
                Ben77&nbsp;(<a href="https://github.com/ben2077">@ben2077</a>),
                Mingshi S.&nbsp;(
                <a href="https://github.com/newnewsms">@newnewsms</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7208">7208</a>
              </td>

              <td className="title">On-Chain Data Container</td>
              <td className="author">
                Rachid Ajaja&nbsp;&lt;
                <a href="mailto:rachid@allianceblock.io">
                  rachid@allianceblock.io
                </a>
                &gt;, Alexandros Athanasopulos&nbsp;(
                <a href="https://github.com/Xaleee">@Xaleee</a>), Pavel
                Rubin&nbsp;(<a href="https://github.com/pash7ka">@pash7ka</a>),
                Sebastian Galimberti Romano&nbsp;(
                <a href="https://github.com/galimba">@galimba</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7246">7246</a>
              </td>

              <td className="title">
                Encumber - Splitting Ownership &amp; Guarantees
              </td>
              <td className="author">
                Coburn Berry&nbsp;(
                <a href="https://github.com/coburncoburn">@coburncoburn</a>),
                Mykel Pereira&nbsp;(
                <a href="https://github.com/mykelp">@mykelp</a>), Scott
                Silver&nbsp;(
                <a href="https://github.com/scott-silver">@scott-silver</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7254">7254</a>
              </td>

              <td className="title">Token Revenue Sharing</td>
              <td className="author">
                Quy Phan&nbsp;(
                <a href="https://github.com/quyphandang">@quyphandang</a>), Quy
                Phan&nbsp;&lt;
                <a href="mailto:quy.phan@cryptoviet.info">
                  quy.phan@cryptoviet.info
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7272">7272</a>
              </td>

              <td className="title">Ethereum Access Token</td>
              <td className="author">
                Chris Chung&nbsp;(
                <a href="https://github.com/0xpApaSmURf">@0xpApaSmURf</a>),
                Raphael Roullet&nbsp;(
                <a href="https://github.com/ra-phael">@ra-phael</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7291">7291</a>
              </td>

              <td className="title">Purpose bound money</td>
              <td className="author">
                Orchid-Dev&nbsp;(
                <a href="https://github.com/proj-orchid-straitsx">
                  @proj-orchid-straitsx
                </a>
                ), Victor Liew&nbsp;(
                <a href="https://github.com/alcedo">@alcedo</a>), Wong Tse
                Jian&nbsp;(
                <a href="https://github.com/wongtsejian">@wongtsejian</a>),
                Jacob Shan&nbsp;(
                <a href="https://github.com/Jacobshan429">@Jacobshan429</a>),
                Chin Sin Ong&nbsp;(
                <a href="https://github.com/chinsinong">@chinsinong</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7303">7303</a>
              </td>

              <td className="title">Token-Controlled Token Circulation</td>
              <td className="author">
                Ko Fujimura&nbsp;(
                <a href="https://github.com/kofujimura">@kofujimura</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7377">7377</a>
              </td>

              <td className="title">Migration Transaction</td>
              <td className="author">
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>), Sam
                Wilson&nbsp;(<a href="https://github.com/samwilsn">@samwilsn</a>
                ), Ansgar Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7390">7390</a>
              </td>

              <td className="title">Vanilla Options for ERC-20 Tokens</td>
              <td className="author">
                Ewan Humbert (@Xeway)&nbsp;&lt;
                <a href="mailto:xeway@protonmail.com">xeway@protonmail.com</a>
                &gt;, Lassi Maksimainen (@mlalma)&nbsp;&lt;
                <a href="mailto:lassi.maksimainen@gmail.com">
                  lassi.maksimainen@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7399">7399</a>
              </td>

              <td className="title">⚡ Flash Loans ⚡</td>
              <td className="author">
                Alberto Cuesta Cañada&nbsp;(
                <a href="https://github.com/alcueca">@alcueca</a>), Michael
                Amadi&nbsp;(
                <a href="https://github.com/AmadiMichaels">@AmadiMichaels</a>),
                Devtooligan&nbsp;(
                <a href="https://github.com/devtooligan">@devtooligan</a>),
                Ultrasecr.eth&nbsp;(
                <a href="https://github.com/ultrasecreth">@ultrasecreth</a>),
                Sam Bacha&nbsp;(
                <a href="https://github.com/sambacha">@sambacha</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7405">7405</a>
              </td>

              <td className="title">Portable Smart Contract Accounts</td>
              <td className="author">
                Aaron Yee&nbsp;(
                <a href="https://github.com/aaronyee-eth">@aaronyee-eth</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7406">7406</a>
              </td>

              <td className="title">Multi-Namespace Onchain Registry</td>
              <td className="author">
                Mengshi Zhang&nbsp;(
                <a href="https://github.com/MengshiZhang">@MengshiZhang</a>),
                Zihao Chen&nbsp;(
                <a href="https://github.com/zihaoccc">@zihaoccc</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7410">7410</a>
              </td>

              <td className="title">ERC-20 Update Allowance By Spender</td>
              <td className="author">
                Mohammad Zakeri Rad&nbsp;(
                <a href="https://github.com/zakrad">@zakrad</a>), Adam
                Boudjemaa&nbsp;(
                <a href="https://github.com/aboudjem">@aboudjem</a>), Mohamad
                Hammoud&nbsp;(
                <a href="https://github.com/mohamadhammoud">@mohamadhammoud</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7412">7412</a>
              </td>

              <td className="title">On-Demand Off-Chain Data Retrieval</td>
              <td className="author">
                Noah Litvin&nbsp;(
                <a href="https://github.com/noahlitvin">@noahlitvin</a>),
                db&nbsp;(<a href="https://github.com/dbeal-eth">@dbeal-eth</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7417">7417</a>
              </td>

              <td className="title">Token Converter</td>
              <td className="author">
                Dexaran (@Dexaran)&nbsp;&lt;
                <a href="mailto:dexaran@ethereumclassic.org">
                  dexaran@ethereumclassic.org
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7425">7425</a>
              </td>

              <td className="title">Tokenized Reserve</td>
              <td className="author">
                Jimmy Debe&nbsp;(
                <a href="https://github.com/jimstir">@jimstir</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7444">7444</a>
              </td>

              <td className="title">Time Locks Maturity</td>
              <td className="author">
                Thanh Trinh (@thanhtrinh2003)&nbsp;&lt;
                <a href="mailto:thanh@revest.finance">thanh@revest.finance</a>
                &gt;, Joshua Weintraub (@jhweintraub)&nbsp;&lt;
                <a href="mailto:josh@revest.finance">josh@revest.finance</a>
                &gt;, Rob Montgomery (@RobAnon)&nbsp;&lt;
                <a href="mailto:rob@revest.finance">rob@revest.finance</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7484">7484</a>
              </td>

              <td className="title">Registry Extension for ERC-7579</td>
              <td className="author">
                Konrad Kopp&nbsp;(
                <a href="https://github.com/kopy-kat">@kopy-kat</a>),
                zeroknots&nbsp;(
                <a href="https://github.com/zeroknots">@zeroknots</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7496">7496</a>
              </td>

              <td className="title">NFT Dynamic Traits</td>
              <td className="author">
                Adam Montgomery&nbsp;(
                <a href="https://github.com/montasaurus">@montasaurus</a>), Ryan
                Ghods&nbsp;(<a href="https://github.com/ryanio">@ryanio</a>),
                0age&nbsp;(<a href="https://github.com/0age">@0age</a>), James
                Wenzel&nbsp;(<a href="https://github.com/emo-eth">@emo-eth</a>),
                Stephan Min&nbsp;(
                <a href="https://github.com/stephankmin">@stephankmin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7498">7498</a>
              </td>

              <td className="title">NFT Redeemables</td>
              <td className="author">
                Ryan Ghods&nbsp;(<a href="https://github.com/ryanio">@ryanio</a>
                ), 0age&nbsp;(<a href="https://github.com/0age">@0age</a>), Adam
                Montgomery&nbsp;(
                <a href="https://github.com/montasaurus">@montasaurus</a>),
                Stephan Min&nbsp;(
                <a href="https://github.com/stephankmin">@stephankmin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7506">7506</a>
              </td>

              <td className="title">Trusted Hint Registry</td>
              <td className="author">
                Philipp Bolte&nbsp;(
                <a href="https://github.com/strumswell">@strumswell</a>), Dennis
                von der Bey&nbsp;(
                <a href="https://github.com/DennisVonDerBey">
                  @DennisVonDerBey
                </a>
                ), Lauritz Leifermann&nbsp;(
                <a href="https://github.com/lleifermann">@lleifermann</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7507">7507</a>
              </td>

              <td className="title">Multi-User NFT Extension</td>
              <td className="author">
                Ming Jiang&nbsp;(<a href="https://github.com/minkyn">@minkyn</a>
                ), Zheng Han&nbsp;(
                <a href="https://github.com/hanbsd">@hanbsd</a>), Fan
                Yang&nbsp;(<a href="https://github.com/fayang">@fayang</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7508">7508</a>
              </td>

              <td className="title">
                Dynamic On-Chain Token Attributes Repository
              </td>
              <td className="author">
                Steven Pineda&nbsp;(
                <a href="https://github.com/steven2308">@steven2308</a>), Jan
                Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7509">7509</a>
              </td>

              <td className="title">Entity Component System</td>
              <td className="author">
                Rickey&nbsp;(
                <a href="https://github.com/HelloRickey">@HelloRickey</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7510">7510</a>
              </td>

              <td className="title">Cross-Contract Hierarchical NFT</td>
              <td className="author">
                Ming Jiang&nbsp;(<a href="https://github.com/minkyn">@minkyn</a>
                ), Zheng Han&nbsp;(
                <a href="https://github.com/hanbsd">@hanbsd</a>), Fan
                Yang&nbsp;(<a href="https://github.com/fayang">@fayang</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7511">7511</a>
              </td>

              <td className="title">Minimal Proxy Contract with PUSH0</td>
              <td className="author">
                0xAA&nbsp;(
                <a href="https://github.com/AmazingAng">@AmazingAng</a>),
                vectorized&nbsp;(
                <a href="https://github.com/Vectorized">@Vectorized</a>),
                0age&nbsp;(<a href="https://github.com/0age">@0age</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7512">7512</a>
              </td>

              <td className="title">Onchain Representation for Audits</td>
              <td className="author">
                Richard Meissner - Safe&nbsp;(
                <a href="https://github.com/rmeissner">@rmeissner</a>), Robert
                Chen - OtterSec&nbsp;(
                <a href="https://github.com/chen-robert">@chen-robert</a>),
                Matthias Egli - ChainSecurity&nbsp;(
                <a href="https://github.com/MatthiasEgli">@MatthiasEgli</a>),
                Jan Kalivoda - Ackee Blockchain&nbsp;(
                <a href="https://github.com/jaczkal">@jaczkal</a>), Michael
                Lewellen - OpenZeppelin&nbsp;(
                <a href="https://github.com/cylon56">@cylon56</a>), Shay Zluf -
                Hats Finance&nbsp;(
                <a href="https://github.com/shayzluf">@shayzluf</a>), Alex
                Papageorgiou - Omniscia&nbsp;(
                <a href="https://github.com/alex-ppg">@alex-ppg</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7513">7513</a>
              </td>

              <td className="title">
                Smart NFT - A Component for Intent-Centric
              </td>
              <td className="author">
                MJ Tseng (@TsengMJ)&nbsp;&lt;
                <a href="mailto:tsngmj@gmail.com">tsngmj@gmail.com</a>&gt;, Clay
                (@Clay2018)&nbsp;&lt;
                <a href="mailto:clay.uw@outlook.com">clay.uw@outlook.com</a>
                &gt;, Jeffery.c&nbsp;&lt;
                <a href="mailto:jeffery.c@a3sprotocol.xyz">
                  jeffery.c@a3sprotocol.xyz
                </a>
                &gt;, Johnny.c&nbsp;&lt;
                <a href="mailto:johnny.c@a3sprotocol.xyz">
                  johnny.c@a3sprotocol.xyz
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7517">7517</a>
              </td>

              <td className="title">Content Consent for AI/ML Data Mining</td>
              <td className="author">
                Bofu Chen&nbsp;(<a href="https://github.com/bafu">@bafu</a>),
                Tammy Yang&nbsp;(
                <a href="https://github.com/tammyyang">@tammyyang</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7518">7518</a>
              </td>

              <td className="title">
                Dynamic Compliant Interop Security Token
              </td>
              <td className="author">
                Abhinav (@abhinav-d3v)&nbsp;&lt;
                <a href="mailto:abhinav@zoniqx.com">abhinav@zoniqx.com</a>&gt;,
                Prithvish Baidya (@d4mr)&nbsp;&lt;
                <a href="mailto:pbaidya@zoniqx.com">pbaidya@zoniqx.com</a>&gt;,
                Rajat Kumar (@rajatwasan)&nbsp;&lt;
                <a href="mailto:rwasan@zoniqx.com">rwasan@zoniqx.com</a>&gt;,
                Prasanth Kalangi&nbsp;&lt;
                <a href="mailto:pkalangi@zoniqx.com">pkalangi@zoniqx.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7521">7521</a>
              </td>

              <td className="title">
                General Intents for Smart Contract Wallets
              </td>
              <td className="author">
                Stephen Monn&nbsp;(
                <a href="https://github.com/pixelcircuits">@pixelcircuits</a>),
                Bikem Bengisu&nbsp;(
                <a href="https://github.com/supiket">@supiket</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7522">7522</a>
              </td>

              <td className="title">OIDC ZK Verifier for AA Account</td>
              <td className="author">
                Shu Dong (@dongshu2013)&nbsp;&lt;
                <a href="mailto:shu@hexlink.io">shu@hexlink.io</a>&gt;, Yudao
                Yan&nbsp;&lt;
                <a href="mailto:dean@dauth.network">dean@dauth.network</a>&gt;,
                Song Z&nbsp;&lt;<a href="mailto:s@misfit.id">s@misfit.id</a>
                &gt;, Kai Chen&nbsp;&lt;
                <a href="mailto:kai@dauth.network">kai@dauth.network</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7524">7524</a>
              </td>

              <td className="title">PLUME Signature in Wallets</td>
              <td className="author">
                Yush G (@Divide-By-0)&nbsp;&lt;
                <a href="mailto:aayushg@mit.edu">aayushg@mit.edu</a>&gt;, Kobi
                Gurkan&nbsp;(<a href="https://github.com/kobigurk">@kobigurk</a>
                ), Richard Liu&nbsp;(
                <a href="https://github.com/rrrliu">@rrrliu</a>), Vivek
                Bhupatiraju&nbsp;(
                <a href="https://github.com/vb7401">@vb7401</a>), Barry
                Whitehat&nbsp;(
                <a href="https://github.com/barryWhiteHat">@barryWhiteHat</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7527">7527</a>
              </td>

              <td className="title">Token Bound Function Oracle AMM</td>
              <td className="author">
                Elaine Zhang (@lanyinzly)&nbsp;&lt;
                <a href="mailto:lz8aj@virginia.edu">lz8aj@virginia.edu</a>&gt;,
                Jerry&nbsp;&lt;
                <a href="mailto:jerrymindflow@gmail.com">
                  jerrymindflow@gmail.com
                </a>
                &gt;, Amandafanny&nbsp;&lt;
                <a href="mailto:amandafanny200@gmail.com">
                  amandafanny200@gmail.com
                </a>
                &gt;, Shouhao Wong (@wangshouh)&nbsp;&lt;
                <a href="mailto:wongshouhao@outlook.com">
                  wongshouhao@outlook.com
                </a>
                &gt;, 0xPoet&nbsp;&lt;
                <a href="mailto:0xpoets@gmail.com">0xpoets@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7529">7529</a>
              </td>

              <td className="title">
                Contract Discovery and eTLD+1 Association
              </td>
              <td className="author">
                Todd Chapman&nbsp;(
                <a href="https://github.com/tthebc01">@tthebc01</a>), Charlie
                Sibbach&nbsp;&lt;
                <a href="mailto:charlie@cwsoftware.com">
                  charlie@cwsoftware.com
                </a>
                &gt;, Sean Sing&nbsp;(
                <a href="https://github.com/seansing">@seansing</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7533">7533</a>
              </td>

              <td className="title">Public Cross Port</td>
              <td className="author">
                George&nbsp;(<a href="https://github.com/JXRow">@JXRow</a>),
                Zisu&nbsp;(<a href="https://github.com/lazy1523">@lazy1523</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7538">7538</a>
              </td>

              <td className="title">Multiplicative Tokens</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7542">7542</a>
              </td>

              <td className="title">
                eth/70 - available-blocks-extended protocol
              </td>
              <td className="author">
                Ahmad Bitar (@smartprogrammer93)&nbsp;&lt;
                <a href="mailto:smartprogrammer@windowslive.com">
                  smartprogrammer@windowslive.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7543">7543</a>
              </td>

              <td className="title">EVM arbitrary precision decimal math</td>
              <td className="author">
                1m1&nbsp;(
                <a href="https://github.com/1m1-github">@1m1-github</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7545">7545</a>
              </td>

              <td className="title">Verkle proof verification precompile</td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Diederik
                Loerakker&nbsp;(
                <a href="https://github.com/protolambda">@protolambda</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7546">7546</a>
              </td>

              <td className="title">
                Upgradeable Clone for Scalable Contracts
              </td>
              <td className="author">
                Shogo Ochiai (@shogochiai)&nbsp;&lt;
                <a href="mailto:shogo.ochiai@pm.me">shogo.ochiai@pm.me</a>&gt;,
                Kai Hiroi (@KaiHiroi)&nbsp;&lt;
                <a href="mailto:kai.hiroi@pm.me">kai.hiroi@pm.me</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7548">7548</a>
              </td>

              <td className="title">Open IP Protocol built on NFTs</td>
              <td className="author">
                Combo&nbsp;&lt;
                <a href="mailto:combo@1combo.io">combo@1combo.io</a>&gt;,
                Saitama&nbsp;(
                <a href="https://github.com/saitama2009">@saitama2009</a>),
                CT29&nbsp;&lt;<a href="mailto:CT29@1combo.io">CT29@1combo.io</a>
                &gt;, Luigi&nbsp;&lt;
                <a href="mailto:luigi@1combo.io">luigi@1combo.io</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7555">7555</a>
              </td>

              <td className="title">Single Sign-On for Account Discovery</td>
              <td className="author">
                Alexander Müller&nbsp;(
                <a href="https://github.com/alexmmueller">@alexmmueller</a>),
                Gregory Markou&nbsp;(
                <a href="https://github.com/GregTheGreek">@GregTheGreek</a>),
                Willem Olding&nbsp;(
                <a href="https://github.com/Wollum">@Wollum</a>), Belma
                Gutlic&nbsp;(<a href="https://github.com/morrigan">@morrigan</a>
                ), Marin Petrunić&nbsp;(
                <a href="https://github.com/mpetrunic">@mpetrunic</a>), Pedro
                Gomes&nbsp;(<a href="https://github.com/pedrouid">@pedrouid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7561">7561</a>
              </td>

              <td className="title">Simple NFT, Simplified ERC-721</td>
              <td className="author">
                Xiang&nbsp;(
                <a href="https://github.com/wenzhenxiang">@wenzhenxiang</a>),
                Ben77&nbsp;(<a href="https://github.com/ben2077">@ben2077</a>),
                Mingshi S.&nbsp;(
                <a href="https://github.com/newnewsms">@newnewsms</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7562">7562</a>
              </td>

              <td className="title">
                Account Abstraction Validation Scope Rules
              </td>
              <td className="author">
                Yoav Weiss&nbsp;(<a href="https://github.com/yoavw">@yoavw</a>),
                Dror Tirosh&nbsp;(
                <a href="https://github.com/drortirosh">@drortirosh</a>), Alex
                Forshtat&nbsp;(
                <a href="https://github.com/forshtat">@forshtat</a>), Shahaf
                Nacson&nbsp;(<a href="https://github.com/shahafn">@shahafn</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7564">7564</a>
              </td>

              <td className="title">Contract wallet management NFT</td>
              <td className="author">
                Xiang&nbsp;(
                <a href="https://github.com/wenzhenxiang">@wenzhenxiang</a>),
                Ben77&nbsp;(<a href="https://github.com/ben2077">@ben2077</a>),
                Mingshi S.&nbsp;(
                <a href="https://github.com/newnewsms">@newnewsms</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7565">7565</a>
              </td>

              <td className="title">Perpetual Contract NFTs as Collateral</td>
              <td className="author">
                Hyoungsung Kim (@HyoungsungKim)&nbsp;&lt;
                <a href="mailto:hyougnsung@keti.re.kr">hyougnsung@keti.re.kr</a>
                &gt;, Yong-Suk Park&nbsp;&lt;
                <a href="mailto:yspark@keti.re.kr">yspark@keti.re.kr</a>&gt;,
                Hyun-Sik Kim&nbsp;&lt;
                <a href="mailto:hskim@keti.re.kr">hskim@keti.re.kr</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7566">7566</a>
              </td>

              <td className="title">Multiplayer Game Communication</td>
              <td className="author">
                Rickey&nbsp;(
                <a href="https://github.com/HelloRickey">@HelloRickey</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7572">7572</a>
              </td>

              <td className="title">
                Contract-level metadata via `contractURI()`
              </td>
              <td className="author">
                Devin Finzer&nbsp;(
                <a href="https://github.com/dfinzer">@dfinzer</a>), Alex
                Atallah&nbsp;(
                <a href="https://github.com/alexanderatallah">
                  @alexanderatallah
                </a>
                ), Ryan Ghods&nbsp;(
                <a href="https://github.com/ryanio">@ryanio</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7573">7573</a>
              </td>

              <td className="title">
                Conditional-upon-Transfer-Decryption for DvP
              </td>
              <td className="author">
                Christian Fries&nbsp;(
                <a href="https://github.com/cfries">@cfries</a>), Peter
                Kohl-Landgraf&nbsp;(
                <a href="https://github.com/pekola">@pekola</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7577">7577</a>
              </td>

              <td className="title">Versioning Scheme for EIPs</td>
              <td className="author">
                danceratopz&nbsp;(
                <a href="https://github.com/danceratopz">@danceratopz</a>),
                Ahmad Bitar&nbsp;(
                <a href="https://github.com/smartprogrammer93">
                  @smartprogrammer93
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7579">7579</a>
              </td>

              <td className="title">Minimal Modular Smart Accounts</td>
              <td className="author">
                zeroknots&nbsp;(
                <a href="https://github.com/zeroknots">@zeroknots</a>), Konrad
                Kopp&nbsp;(<a href="https://github.com/kopy-kat">@kopy-kat</a>),
                Taek Lee&nbsp;(<a href="https://github.com/leekt">@leekt</a>),
                Fil Makarov&nbsp;(
                <a href="https://github.com/filmakarov">@filmakarov</a>), Elim
                Poon&nbsp;(<a href="https://github.com/yaonam">@yaonam</a>), Lyu
                Min&nbsp;(
                <a href="https://github.com/rockmin216">@rockmin216</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7580">7580</a>
              </td>

              <td className="title">Advertisement Tracking Interface</td>
              <td className="author">
                wart&nbsp;(<a href="https://github.com/wartstone">@wartstone</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7582">7582</a>
              </td>

              <td className="title">
                Modular Accounts with Delegated Validation
              </td>
              <td className="author">
                Shivanshi Tyagi&nbsp;(
                <a href="https://github.com/nerderlyne">@nerderlyne</a>), Ross
                Campbell&nbsp;(<a href="https://github.com/z0r0z">@z0r0z</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7585">7585</a>
              </td>

              <td className="title">MixHash and Public Data Storage Proofs</td>
              <td className="author">
                Liu Zhicong&nbsp;(
                <a href="https://github.com/waterflier">@waterflier</a>),
                William Entriken&nbsp;(
                <a href="https://github.com/fulldecent">@fulldecent</a>), Wei
                Qiushi&nbsp;(
                <a href="https://github.com/weiqiushi">@weiqiushi</a>), Si
                Changjun&nbsp;(
                <a href="https://github.com/photosssa">@photosssa</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7589">7589</a>
              </td>

              <td className="title">Semi-Fungible Token Roles</td>
              <td className="author">
                Ernani São Thiago&nbsp;(
                <a href="https://github.com/ernanirst">@ernanirst</a>), Daniel
                Lima&nbsp;(<a href="https://github.com/karacurt">@karacurt</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7591">7591</a>
              </td>

              <td className="title">BLS signed transactions</td>
              <td className="author">
                Marius van der Wijden&nbsp;(
                <a href="https://github.com/MariusVanDerWijden">
                  @MariusVanDerWijden
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7597">7597</a>
              </td>

              <td className="title">
                Signature Validation Extension for Permit
              </td>
              <td className="author">
                Yvonne Zhang&nbsp;(
                <a href="https://github.com/yvonnezhangc">@yvonnezhangc</a>),
                Aloysius Chan&nbsp;(
                <a href="https://github.com/circle-aloychan">
                  @circle-aloychan
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7598">7598</a>
              </td>

              <td className="title">
                Use contract signature for signed transfer
              </td>
              <td className="author">
                Yvonne Zhang&nbsp;(
                <a href="https://github.com/yvonnezhangc">@yvonnezhangc</a>),
                Aloysius Chan&nbsp;(
                <a href="https://github.com/circle-aloychan">
                  @circle-aloychan
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7604">7604</a>
              </td>

              <td className="title">ERC-1155 Permit Approvals</td>
              <td className="author">
                calvbore&nbsp;(
                <a href="https://github.com/calvbore">@calvbore</a>),
                emiliolanzalaco&nbsp;(
                <a href="https://github.com/emiliolanzalaco">
                  @emiliolanzalaco
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7607">7607</a>
              </td>

              <td className="title">Hardfork Meta - Osaka</td>
              <td className="author">
                Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7609">7609</a>
              </td>

              <td className="title">Decrease base cost of TLOAD/TSTORE</td>
              <td className="author">
                Charles Cooper&nbsp;(
                <a href="https://github.com/charles-cooper">@charles-cooper</a>
                ), James Prestwich&nbsp;(
                <a href="https://github.com/prestwich">@prestwich</a>),
                brockelmore&nbsp;(
                <a href="https://github.com/brockelmore">@brockelmore</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7610">7610</a>
              </td>

              <td className="title">
                Revert creation in case of non-empty storage
              </td>
              <td className="author">
                Gary Rong&nbsp;(
                <a href="https://github.com/rjl493456442">@rjl493456442</a>),
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7612">7612</a>
              </td>

              <td className="title">
                Verkle state transition via an overlay tree
              </td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Ansgar
                Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>),
                Ignacio Hagopian&nbsp;(
                <a href="https://github.com/jsign">@jsign</a>), Gottfried
                Herold&nbsp;(
                <a href="https://github.com/GottfriedHerold">
                  @GottfriedHerold
                </a>
                ), Jamie Lokier&nbsp;(
                <a href="https://github.com/jlokier">@jlokier</a>), Tanishq
                Jasoria&nbsp;(
                <a href="https://github.com/tanishqjasoria">@tanishqjasoria</a>
                ), Parithosh Jayanthi&nbsp;(
                <a href="https://github.com/parithosh">@parithosh</a>), Gabriel
                Rocheleau&nbsp;(
                <a href="https://github.com/gabrocheleau">@gabrocheleau</a>),
                Karim Taam&nbsp;(<a href="https://github.com/matkt">@matkt</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7615">7615</a>
              </td>

              <td className="title">
                Atomic Push-based Data Feed Among Contracts
              </td>
              <td className="author">
                Elaine Zhang (@lanyinzly)&nbsp;&lt;
                <a href="mailto:lz8aj@virginia.edu">lz8aj@virginia.edu</a>&gt;,
                Jerry&nbsp;&lt;
                <a href="mailto:jerrymindflow@gmail.com">
                  jerrymindflow@gmail.com
                </a>
                &gt;, Amandafanny&nbsp;&lt;
                <a href="mailto:amandafanny200@gmail.com">
                  amandafanny200@gmail.com
                </a>
                &gt;, Shouhao Wong (@wangshouh)&nbsp;&lt;
                <a href="mailto:wongshouhao@outlook.com">
                  wongshouhao@outlook.com
                </a>
                &gt;, Doris Che (@Cheyukj)&nbsp;&lt;
                <a href="mailto:dorischeyy@gmail.com">dorischeyy@gmail.com</a>
                &gt;, Henry Yuan (@onehumanbeing)&nbsp;&lt;
                <a href="mailto:hy2878@nyu.edu">hy2878@nyu.edu</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7617">7617</a>
              </td>

              <td className="title">
                Chunk support for ERC-5219 mode in Web3 URL
              </td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>),
                Nicolas Deschildre&nbsp;(
                <a href="https://github.com/nand2">@nand2</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7618">7618</a>
              </td>

              <td className="title">
                Content encoding in ERC-5219 mode Web3 URL
              </td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>),
                Nicolas Deschildre&nbsp;(
                <a href="https://github.com/nand2">@nand2</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7621">7621</a>
              </td>

              <td className="title">Basket Token</td>
              <td className="author">
                Dominic Ryder&nbsp;&lt;
                <a href="mailto:dom@alvaraprotocol.io">dom@alvaraprotocol.io</a>
                &gt;, Callum Mitchell-Clark (@AlvaraProtocol)&nbsp;&lt;
                <a href="mailto:callum@alvaraprotocol.io">
                  callum@alvaraprotocol.io
                </a>
                &gt;, Joey van Etten&nbsp;&lt;
                <a href="mailto:joe@alvaraprotocol.io">joe@alvaraprotocol.io</a>
                &gt;, Michael Ryder&nbsp;&lt;
                <a href="mailto:mike@alvaraprotocol.io">
                  mike@alvaraprotocol.io
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7627">7627</a>
              </td>

              <td className="title">Secure Messaging Protocol</td>
              <td className="author">
                Chen Liaoyuan (@chenly)&nbsp;&lt;
                <a href="mailto:cly@kip.pro">cly@kip.pro</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7628">7628</a>
              </td>

              <td className="title">ERC-721 Ownership Shares Extension</td>
              <td className="author">
                Chen Liaoyuan (@chenly)&nbsp;&lt;
                <a href="mailto:cly@kip.pro">cly@kip.pro</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7629">7629</a>
              </td>

              <td className="title">ERC-20/ERC-721 Unified Token Interface</td>
              <td className="author">
                0xZeus1111&nbsp;(
                <a href="https://github.com/0xZeus1111">@0xZeus1111</a>),
                Nvuwa&nbsp;(<a href="https://github.com/Nvuwa">@Nvuwa</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7631">7631</a>
              </td>

              <td className="title">Dual Nature Token Pair</td>
              <td className="author">
                vectorized&nbsp;(
                <a href="https://github.com/vectorized">@vectorized</a>),
                Thomas&nbsp;(<a href="https://github.com/0xth0mas">@0xth0mas</a>
                ), Quit&nbsp;(
                <a href="https://github.com/quitcrypto">@quitcrypto</a>),
                Michael Amadi&nbsp;(
                <a href="https://github.com/AmadiMichael">@AmadiMichael</a>),
                cygaar&nbsp;(<a href="https://github.com/cygaar">@cygaar</a>),
                Harrison&nbsp;(
                <a href="https://github.com/pop-punk">@pop-punk</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7632">7632</a>
              </td>

              <td className="title">Interfaces for Named Token</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7634">7634</a>
              </td>

              <td className="title">Limited Transfer Count NFT</td>
              <td className="author">
                Qin Wang&nbsp;(
                <a href="https://github.com/qinwang-git">@qinwang-git</a>),
                Saber Yu&nbsp;(
                <a href="https://github.com/OniReimu">@OniReimu</a>), Shiping
                Chen&nbsp;&lt;
                <a href="mailto:shiping.chen@data61.csiro.au">
                  shiping.chen@data61.csiro.au
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7638">7638</a>
              </td>

              <td className="title">Batch Calls Encoding in SCA</td>
              <td className="author">
                George&nbsp;(<a href="https://github.com/JXRow">@JXRow</a>),
                Zisu&nbsp;(<a href="https://github.com/lazy1523">@lazy1523</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7639">7639</a>
              </td>

              <td className="title">Cease serving history before PoS</td>
              <td className="author">
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7641">7641</a>
              </td>

              <td className="title">Intrinsic RevShare Token</td>
              <td className="author">
                Conway&nbsp;(<a href="https://github.com/0x1cc">@0x1cc</a>),
                Cathie So&nbsp;(
                <a href="https://github.com/socathie">@socathie</a>), Xiaohang
                Yu&nbsp;(
                <a href="https://github.com/xhyumiracle">@xhyumiracle</a>),
                Suning Yao&nbsp;(
                <a href="https://github.com/fewwwww">@fewwwww</a>),
                Kartin&nbsp;&lt;
                <a href="mailto:kartin@hyperoracle.io">kartin@hyperoracle.io</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7642">7642</a>
              </td>

              <td className="title">eth/69 - Drop pre-merge fields</td>
              <td className="author">
                Marius van der Wijden&nbsp;(
                <a href="https://github.com/MariusVanDerWijden">
                  @MariusVanDerWijden
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7643">7643</a>
              </td>

              <td className="title">History accumulator for pre-PoS data</td>
              <td className="author">
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>),
                kdeme&nbsp;(<a href="https://github.com/kdeme">@kdeme</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7644">7644</a>
              </td>

              <td className="title">ERC-721 Name Registry Extension</td>
              <td className="author">
                Chen Liaoyuan&nbsp;(
                <a href="https://github.com/chenly">@chenly</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7645">7645</a>
              </td>

              <td className="title">Alias ORIGIN to SENDER</td>
              <td className="author">
                Cyrus Adkisson&nbsp;(
                <a href="https://github.com/cyrusadkisson">@cyrusadkisson</a>),
                Eirik Ulversøy&nbsp;(
                <a href="https://github.com/EirikUlversoy">@EirikUlversoy</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7649">7649</a>
              </td>

              <td className="title">
                Bonding curve-embedded liquidity for NFTs
              </td>
              <td className="author">
                Arif Khan&nbsp;&lt;
                <a href="mailto:arif@alethea.ai">arif@alethea.ai</a>&gt;, Ahmad
                Matyana&nbsp;&lt;
                <a href="mailto:ahmad@alethea.ai">ahmad@alethea.ai</a>&gt;,
                Basil Gorin&nbsp;(
                <a href="https://github.com/vgorin">@vgorin</a>), Vijay
                Bhayani&nbsp;(
                <a href="https://github.com/unblocktechie">@unblocktechie</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7650">7650</a>
              </td>

              <td className="title">Programmable access lists</td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>),
                Zhiqiang Xu&nbsp;(
                <a href="https://github.com/zhiqiangxu">@zhiqiangxu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7651">7651</a>
              </td>

              <td className="title">
                Fractionally Represented Non-Fungible Token
              </td>
              <td className="author">
                Acme&nbsp;(<a href="https://github.com/0xacme">@0xacme</a>),
                Calder&nbsp;(
                <a href="https://github.com/caldereth">@caldereth</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7654">7654</a>
              </td>

              <td className="title">Request Method Types</td>
              <td className="author">
                Rickey&nbsp;(
                <a href="https://github.com/HelloRickey">@HelloRickey</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7656">7656</a>
              </td>

              <td className="title">Generalized Token-Linked Services</td>
              <td className="author">
                Francesco Sullo&nbsp;(
                <a href="https://github.com/sullof">@sullof</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7657">7657</a>
              </td>

              <td className="title">Sync committee slashings</td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7666">7666</a>
              </td>

              <td className="title">EVM-ify the identity precompile</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7667">7667</a>
              </td>

              <td className="title">Raise gas costs of hash functions</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7668">7668</a>
              </td>

              <td className="title">Remove bloom filters</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7673">7673</a>
              </td>

              <td className="title">Distinguishable base256emoji Addresses</td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7675">7675</a>
              </td>

              <td className="title">Retroactively Included EIPs</td>
              <td className="author">
                Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7676">7676</a>
              </td>

              <td className="title">
                EOF - Prepare for Address Space Extension
              </td>
              <td className="author">
                Danno Ferrin&nbsp;(
                <a href="https://github.com/shemnon">@shemnon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7677">7677</a>
              </td>

              <td className="title">Paymaster Web Service Capability</td>
              <td className="author">
                Lukas Rosario&nbsp;(
                <a href="https://github.com/lukasrosario">@lukasrosario</a>),
                Dror Tirosh&nbsp;(
                <a href="https://github.com/drortirosh">@drortirosh</a>), Wilson
                Cusack&nbsp;(
                <a href="https://github.com/wilsoncusack">@wilsoncusack</a>),
                Kristof Gazso&nbsp;(
                <a href="https://github.com/kristofgazso">@kristofgazso</a>),
                Hazim Jumali&nbsp;(
                <a href="https://github.com/hazim-j">@hazim-j</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7679">7679</a>
              </td>

              <td className="title">UserOperation Builder</td>
              <td className="author">
                Derek Chiang&nbsp;(
                <a href="https://github.com/derekchiang">@derekchiang</a>),
                Garvit Khatri&nbsp;(
                <a href="https://github.com/plusminushalf">@plusminushalf</a>),
                Fil Makarov&nbsp;(
                <a href="https://github.com/filmakarov">@filmakarov</a>),
                Kristof Gazso&nbsp;(
                <a href="https://github.com/kristofgazso">@kristofgazso</a>),
                Derek Rein&nbsp;(<a href="https://github.com/arein">@arein</a>),
                Tomas Rocchi&nbsp;(
                <a href="https://github.com/tomiir">@tomiir</a>),
                bumblefudge&nbsp;(
                <a href="https://github.com/bumblefudge">@bumblefudge</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7681">7681</a>
              </td>

              <td className="title">Dual Nature Multi Token Protocol</td>
              <td className="author">
                Sennett Lau&nbsp;(
                <a href="https://github.com/sennett-lau">@sennett-lau</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7682">7682</a>
              </td>

              <td className="title">Auxiliary Funds Capability</td>
              <td className="author">
                Lukas Rosario&nbsp;(
                <a href="https://github.com/lukasrosario">@lukasrosario</a>),
                Wilson Cusack&nbsp;(
                <a href="https://github.com/wilsoncusack">@wilsoncusack</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7683">7683</a>
              </td>

              <td className="title">Cross Chain Intents</td>
              <td className="author">
                Mark Toda&nbsp;(
                <a href="https://github.com/marktoda">@marktoda</a>), Matt
                Rice&nbsp;(<a href="https://github.com/mrice32">@mrice32</a>),
                Nick Pai&nbsp;(
                <a href="https://github.com/nicholaspai">@nicholaspai</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7684">7684</a>
              </td>

              <td className="title">
                Return deposits for distinct credentials
              </td>
              <td className="author">
                Lion&nbsp;(<a href="https://github.com/dapplion">@dapplion</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7686">7686</a>
              </td>

              <td className="title">Linear EVM memory limits</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7700">7700</a>
              </td>

              <td className="title">Cross-chain Storage Router Protocol</td>
              <td className="author">
                Avneet Singh&nbsp;(
                <a href="https://github.com/sshmatrix">@sshmatrix</a>),
                0xc0de4c0ffee&nbsp;(
                <a href="https://github.com/0xc0de4c0ffee">@0xc0de4c0ffee</a>),
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>), Makoto
                Inoue&nbsp;(<a href="https://github.com/makoto">@makoto</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7701">7701</a>
              </td>

              <td className="title">Native Account Abstraction with EOF</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Yoav
                Weiss&nbsp;(<a href="https://github.com/yoavw">@yoavw</a>), Alex
                Forshtat&nbsp;(
                <a href="https://github.com/forshtat">@forshtat</a>), Dror
                Tirosh&nbsp;(
                <a href="https://github.com/drortirosh">@drortirosh</a>), Shahaf
                Nacson&nbsp;(<a href="https://github.com/shahafn">@shahafn</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7703">7703</a>
              </td>

              <td className="title">Increase calldata cost</td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7705">7705</a>
              </td>

              <td className="title">NONREENTRANT and REENTRANT opcodes</td>
              <td className="author">
                Charles Cooper&nbsp;(
                <a href="https://github.com/charles-cooper">@charles-cooper</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7706">7706</a>
              </td>

              <td className="title">Separate gas type for calldata</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7707">7707</a>
              </td>

              <td className="title">Incentivize Access List Provisioning</td>
              <td className="author">
                Ben Adams&nbsp;(
                <a href="https://github.com/benaadams">@benaadams</a>), Oleg
                Iakushkin&nbsp;(
                <a href="https://github.com/OlegJakushkin">@OlegJakushkin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7708">7708</a>
              </td>

              <td className="title">ETH transfers emit a log</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Peter
                Davies&nbsp;(
                <a href="https://github.com/petertdavies">@petertdavies</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7709">7709</a>
              </td>

              <td className="title">
                Read BLOCKHASH from storage and update cost
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Tomasz
                Stanczak&nbsp;(
                <a href="https://github.com/tkstanczak">@tkstanczak</a>),
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Gajinder
                Singh&nbsp;(<a href="https://github.com/g11tech">@g11tech</a>),
                Tanishq Jasoria&nbsp;(
                <a href="https://github.com/tanishqjasoria">@tanishqjasoria</a>
                ), Ignacio Hagopian&nbsp;(
                <a href="https://github.com/jsign">@jsign</a>), Jochem
                Brouwer&nbsp;(
                <a href="https://github.com/jochem-brouwer">@jochem-brouwer</a>
                ), Gabriel Rocheleau&nbsp;(
                <a href="https://github.com/gabrocheleau">@gabrocheleau</a>)
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

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7716">7716</a>
              </td>

              <td className="title">Anti-correlation attestation penalties</td>
              <td className="author">
                dapplion&nbsp;(
                <a href="https://github.com/dapplion">@dapplion</a>), Toni
                Wahrstätter&nbsp;(
                <a href="https://github.com/nerolation">@nerolation</a>),
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7720">7720</a>
              </td>

              <td className="title">Deferred Token Transfer</td>
              <td className="author">
                Chen Liaoyuan (@chenly)&nbsp;&lt;
                <a href="mailto:cly@kip.pro">cly@kip.pro</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7721">7721</a>
              </td>

              <td className="title">Lockable Extension for ERC-1155</td>
              <td className="author">
                Piyush Chittara&nbsp;(
                <a href="https://github.com/piyush-chittara">
                  @piyush-chittara
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7723">7723</a>
              </td>

              <td className="title">Network Upgrade Inclusion Stages</td>
              <td className="author">
                Tim Beiko&nbsp;(
                <a href="https://github.com/timbeiko">@timbeiko</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7727">7727</a>
              </td>

              <td className="title">EVM Transaction Bundles</td>
              <td className="author">
                Lily Johnson&nbsp;(
                <a href="https://github.com/lilyjjo">@lilyjjo</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7732">7732</a>
              </td>

              <td className="title">Enshrined Proposer-Builder Separation</td>
              <td className="author">
                Francesco D'Amato&nbsp;&lt;
                <a href="mailto:francesco.damato@ethereum.org">
                  francesco.damato@ethereum.org
                </a>
                &gt;, Barnabé Monnot&nbsp;&lt;
                <a href="mailto:barnabe.monnot@ethereum.org">
                  barnabe.monnot@ethereum.org
                </a>
                &gt;, Michael Neuder&nbsp;&lt;
                <a href="mailto:michael.neuder@ethereum.org">
                  michael.neuder@ethereum.org
                </a>
                &gt;, Potuz&nbsp;(<a href="https://github.com/potuz">@potuz</a>
                ), Terence Tsao&nbsp;&lt;
                <a href="mailto:ttsao@offchainlabs.com">
                  ttsao@offchainlabs.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7736">7736</a>
              </td>

              <td className="title">Leaf-level state expiry in verkle trees</td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Wei Han
                Ng&nbsp;(<a href="https://github.com/weiihann">@weiihann</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7742">7742</a>
              </td>

              <td className="title">Uncouple blob count between CL and EL</td>
              <td className="author">
                Alex Stokes&nbsp;(
                <a href="https://github.com/ralexstokes">@ralexstokes</a>)
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
                <a href="/EIPS/eip-86">86</a>
              </td>

              <td className="title">
                Abstraction of transaction origin and signature
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-101">101</a>
              </td>

              <td className="title">
                Serenity Currency and Crypto Abstraction
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

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
                <a href="/EIPS/eip-205">205</a>
              </td>

              <td className="title">ENS support for contract ABIs</td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:nick@ethereum.org">nick@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-210">210</a>
              </td>

              <td className="title">Blockhash refactoring</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-233">233</a>
              </td>

              <td className="title">Formal process of hard forks</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-615">615</a>
              </td>

              <td className="title">
                Subroutines and Static Jumps for the EVM
              </td>
              <td className="author">
                Greg Colvin&nbsp;&lt;
                <a href="mailto:greg@colvin.org">greg@colvin.org</a>&gt;,
                Brooklyn Zelenka&nbsp;(
                <a href="https://github.com/expede">@expede</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Christian Reitwiessner&nbsp;(
                <a href="https://github.com/chriseth">@chriseth</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-616">616</a>
              </td>

              <td className="title">SIMD Operations for the EVM</td>
              <td className="author">
                Greg Colvin&nbsp;&lt;
                <a href="mailto:greg@colvin.org">greg@colvin.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-634">634</a>
              </td>

              <td className="title">Storage of text records in ENS</td>
              <td className="author">
                Richard Moore&nbsp;(
                <a href="https://github.com/ricmoo">@ricmoo</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-665">665</a>
              </td>

              <td className="title">
                Add precompiled contract for Ed25519 signature verification
              </td>
              <td className="author">
                Tobias Oberstein&nbsp;&lt;
                <a href="mailto:tobias.oberstein@crossbario.com">
                  tobias.oberstein@crossbario.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-689">689</a>
              </td>

              <td className="title">
                Address Collision of Contract Address Causes Exceptional Halt
              </td>
              <td className="author">
                Yoichi Hirai&nbsp;&lt;
                <a href="mailto:i@yoichihirai.com">i@yoichihirai.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-698">698</a>
              </td>

              <td className="title">OPCODE 0x46 BLOCKREWARD</td>
              <td className="author">
                Cody Burns&nbsp;&lt;
                <a href="mailto:dontPanic@codywburns.com">
                  dontPanic@codywburns.com
                </a>
                &gt;
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
                <a href="/EIPS/eip-801">801</a>
              </td>

              <td className="title">Canary Standard</td>
              <td className="author">
                ligi&nbsp;&lt;<a href="mailto:ligi@ligi.de">ligi@ligi.de</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-823">823</a>
              </td>

              <td className="title">Token Exchange Standard</td>
              <td className="author">
                Kashish Khullar&nbsp;&lt;
                <a href="mailto:kkhullar7@gmail.com">kkhullar7@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-831">831</a>
              </td>

              <td className="title">URI Format for Ethereum</td>
              <td className="author">
                ligi&nbsp;(<a href="https://github.com/ligi">@ligi</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-858">858</a>
              </td>

              <td className="title">
                Reduce block reward and delay difficulty bomb
              </td>
              <td className="author">
                Carl Larson&nbsp;&lt;
                <a href="mailto:cslarson@gmail.com">cslarson@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-867">867</a>
              </td>

              <td className="title">
                Standardized Ethereum Recovery Proposals
              </td>
              <td className="author">
                Dan Phifer&nbsp;&lt;
                <a href="mailto:dp@musiconomi.com">dp@musiconomi.com</a>&gt;,
                James Levy&nbsp;&lt;
                <a href="mailto:james@taptrust.com">james@taptrust.com</a>&gt;,
                Reuben Youngblom&nbsp;&lt;
                <a href="mailto:reuben@taptrust.com">reuben@taptrust.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-884">884</a>
              </td>

              <td className="title">DGCL Token</td>
              <td className="author">
                Dave Sag&nbsp;&lt;
                <a href="mailto:davesag@gmail.com">davesag@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-897">897</a>
              </td>

              <td className="title">DelegateProxy</td>
              <td className="author">
                Jorge Izquierdo&nbsp;&lt;
                <a href="mailto:jorge@aragon.one">jorge@aragon.one</a>&gt;,
                Manuel Araoz&nbsp;&lt;
                <a href="mailto:manuel@zeppelin.solutions">
                  manuel@zeppelin.solutions
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-900">900</a>
              </td>

              <td className="title">Simple Staking Interface</td>
              <td className="author">
                Dean Eigenmann&nbsp;&lt;
                <a href="mailto:dean@tokenate.io">dean@tokenate.io</a>&gt;,
                Jorge Izquierdo&nbsp;&lt;
                <a href="mailto:jorge@aragon.one">jorge@aragon.one</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-902">902</a>
              </td>

              <td className="title">Token Validation</td>
              <td className="author">
                Brooklyn Zelenka&nbsp;(
                <a href="https://github.com/expede">@expede</a>), Tom
                Carchrae&nbsp;(
                <a href="https://github.com/carchrae">@carchrae</a>), Gleb
                Naumenko&nbsp;(
                <a href="https://github.com/naumenkogs">@naumenkogs</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-918">918</a>
              </td>

              <td className="title">Mineable Token Standard</td>
              <td className="author">
                Jay Logelin&nbsp;&lt;
                <a href="mailto:jlogelin@alumni.harvard.edu">
                  jlogelin@alumni.harvard.edu
                </a>
                &gt;, Infernal_toast&nbsp;&lt;
                <a href="mailto:admin@0xbitcoin.org">admin@0xbitcoin.org</a>
                &gt;, Michael Seiler&nbsp;&lt;
                <a href="mailto:mgs33@cornell.edu">mgs33@cornell.edu</a>&gt;,
                Brandon Grill&nbsp;&lt;
                <a href="mailto:bg2655@columbia.edu">bg2655@columbia.edu</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-926">926</a>
              </td>

              <td className="title">Address metadata registry</td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:nick@ethereum.org">nick@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-927">927</a>
              </td>

              <td className="title">Generalised authorisations</td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:nick@ethereum.org">nick@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-969">969</a>
              </td>

              <td className="title">
                Modifications to ethash to invalidate existing dedicated
                hardware implementations
              </td>
              <td className="author">
                David Stanfill&nbsp;&lt;
                <a href="mailto:david@airsquirrels.com">
                  david@airsquirrels.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1010">1010</a>
              </td>

              <td className="title">
                Uniformity Between 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
                and 0x15E55EF43efA8348dDaeAa455F16C43B64917e3c
              </td>
              <td className="author">
                Anderson Wesley&nbsp;(
                <a href="https://github.com/andywesley">@andywesley</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1011">1011</a>
              </td>

              <td className="title">Hybrid Casper FFG</td>
              <td className="author">
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                ), Chih-Cheng Liang&nbsp;(
                <a href="https://github.com/ChihChengLiang">@ChihChengLiang</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1015">1015</a>
              </td>

              <td className="title">Configurable On Chain Issuance</td>
              <td className="author">
                Alex Van de Sande&nbsp;&lt;
                <a href="mailto:avsa@ethereum.org">avsa@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1051">1051</a>
              </td>

              <td className="title">Overflow checking for the EVM</td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:arachnid@notdot.net">arachnid@notdot.net</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1056">1056</a>
              </td>

              <td className="title">Ethereum Lightweight Identity</td>
              <td className="author">
                Pelle Braendgaard&nbsp;&lt;
                <a href="mailto:pelle.braendgaard@consensys.net">
                  pelle.braendgaard@consensys.net
                </a>
                &gt;, Joel Torstensson&nbsp;&lt;
                <a href="mailto:oed@consensys.net">oed@consensys.net</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1057">1057</a>
              </td>

              <td className="title">ProgPoW, a Programmatic Proof-of-Work</td>
              <td className="author">
                Greg Colvin&nbsp;&lt;
                <a href="mailto:greg@colvin.org">greg@colvin.org</a>&gt;, Andrea
                Lanfranchi&nbsp;(
                <a href="https://github.com/AndreaLanfranchi">
                  @AndreaLanfranchi
                </a>
                ), Michael Carter&nbsp;(
                <a href="https://github.com/bitsbetrippin">@bitsbetrippin</a>),
                IfDefElse&nbsp;&lt;
                <a href="mailto:ifdefelse@protonmail.com">
                  ifdefelse@protonmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1062">1062</a>
              </td>

              <td className="title">
                Formalize IPFS hash into ENS(Ethereum Name Service) resolver
              </td>
              <td className="author">
                Phyrex Tsai&nbsp;&lt;
                <a href="mailto:phyrex@portal.network">phyrex@portal.network</a>
                &gt;, Portal Network Team
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1066">1066</a>
              </td>

              <td className="title">Status Codes</td>
              <td className="author">
                Brooklyn Zelenka&nbsp;(
                <a href="https://github.com/expede">@expede</a>), Tom
                Carchrae&nbsp;(
                <a href="https://github.com/carchrae">@carchrae</a>), Gleb
                Naumenko&nbsp;(
                <a href="https://github.com/naumenkogs">@naumenkogs</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1077">1077</a>
              </td>

              <td className="title">Gas relay for contract calls</td>
              <td className="author">
                Alex Van de Sande&nbsp;&lt;
                <a href="mailto:avsa@ethereum.org">avsa@ethereum.org</a>&gt;,
                Ricardo Guilherme Schmidt&nbsp;(
                <a href="https://github.com/3esmit">@3esmit</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1078">1078</a>
              </td>

              <td className="title">
                Universal login / signup using ENS subdomains
              </td>
              <td className="author">
                Alex Van de Sande&nbsp;&lt;
                <a href="mailto:avsa@ethereum.org">avsa@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1080">1080</a>
              </td>

              <td className="title">Recoverable Token</td>
              <td className="author">
                Bradley Leatherwood&nbsp;&lt;
                <a href="mailto:bradleat@inkibra.com">bradleat@inkibra.com</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1081">1081</a>
              </td>

              <td className="title">Standard Bounties</td>
              <td className="author">
                Mark Beylin&nbsp;&lt;
                <a href="mailto:mark.beylin@consensys.net">
                  mark.beylin@consensys.net
                </a>
                &gt;, Kevin Owocki&nbsp;&lt;
                <a href="mailto:kevin.owocki@consensys.net">
                  kevin.owocki@consensys.net
                </a>
                &gt;, Ricardo Guilherme Schmidt&nbsp;(
                <a href="https://github.com/3esmit">@3esmit</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1087">1087</a>
              </td>

              <td className="title">Net gas metering for SSTORE operations</td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1102">1102</a>
              </td>

              <td className="title">Opt-in account exposure</td>
              <td className="author">
                Paul Bouchon&nbsp;&lt;
                <a href="mailto:mail@bitpshr.net">mail@bitpshr.net</a>&gt;, Erik
                Marks&nbsp;(<a href="https://github.com/rekmarks">@rekmarks</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1109">1109</a>
              </td>

              <td className="title">
                PRECOMPILEDCALL opcode (Remove CALL costs for precompiled
                contracts)
              </td>
              <td className="author">
                Jordi Baylina&nbsp;(
                <a href="https://github.com/jbaylina">@jbaylina</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1129">1129</a>
              </td>

              <td className="title">Standardised DAPP announcements</td>
              <td className="author">
                Jan Turk&nbsp;(
                <a href="https://github.com/ThunderDeliverer">
                  @ThunderDeliverer
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1132">1132</a>
              </td>

              <td className="title">
                Extending ERC20 with token locking capability
              </td>
              <td className="author">
                nitika-goel&nbsp;&lt;
                <a href="mailto:nitika@govblocks.io">nitika@govblocks.io</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1175">1175</a>
              </td>

              <td className="title">
                Wallet &amp; shop standard for all tokens (erc20)
              </td>
              <td className="author">
                Jet Lim&nbsp;(
                <a href="https://github.com/Nitro888">@Nitro888</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1178">1178</a>
              </td>

              <td className="title">Multi-class Token Standard</td>
              <td className="author">
                Albert Chon&nbsp;&lt;
                <a href="mailto:achon@stanford.edu">achon@stanford.edu</a>&gt;
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
                <a href="/EIPS/eip-1203">1203</a>
              </td>

              <td className="title">
                ERC-1203 Multi-Class Token Standard (ERC-20 Extension)
              </td>
              <td className="author">
                Jeff Huang&nbsp;&lt;
                <a href="mailto:jeffishjeff@gmail.com">jeffishjeff@gmail.com</a>
                &gt;, Min Zu&nbsp;&lt;
                <a href="mailto:crawlregister@gmail.com">
                  crawlregister@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1207">1207</a>
              </td>

              <td className="title">DAuth Access Delegation Standard</td>
              <td className="author">
                Xiaoyu Wang&nbsp;(
                <a href="https://github.com/wxygeek">@wxygeek</a>), Bicong
                Wang&nbsp;(
                <a href="https://github.com/Wangbicong">@Wangbicong</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1227">1227</a>
              </td>

              <td className="title">
                Defuse Difficulty Bomb and Reset Block Reward
              </td>
              <td className="author">
                SmeargleUsedFly&nbsp;(
                <a href="https://github.com/SmeargleUsedFly">
                  @SmeargleUsedFly
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1261">1261</a>
              </td>

              <td className="title">Membership Verification Token (MVT)</td>
              <td className="author">
                Chaitanya Potti&nbsp;(
                <a href="https://github.com/chaitanyapotti">@chaitanyapotti</a>
                ), Partha Bhattacharya&nbsp;(
                <a href="https://github.com/pb25193">@pb25193</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1276">1276</a>
              </td>

              <td className="title">
                Eliminate Difficulty Bomb and Adjust Block Reward on
                Constantinople Shift
              </td>
              <td className="author">
                EOS Classic&nbsp;(
                <a href="https://github.com/eosclassicteam">@eosclassicteam</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1285">1285</a>
              </td>

              <td className="title">
                Increase Gcallstipend gas in the CALL opcode
              </td>
              <td className="author">
                Ben Kaufman&nbsp;&lt;
                <a href="mailto:ben@daostack.io">ben@daostack.io</a>&gt;, Adam
                Levi&nbsp;&lt;
                <a href="mailto:adam@daostack.io">adam@daostack.io</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1295">1295</a>
              </td>

              <td className="title">
                Modify Ethereum PoW Incentive Structure and Delay Difficulty
                Bomb
              </td>
              <td className="author">
                Brian Venturo&nbsp;(
                <a href="https://github.com/atlanticcrypto">@atlanticcrypto</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1319">1319</a>
              </td>

              <td className="title">
                Smart Contract Package Registry Interface
              </td>
              <td className="author">
                Piper Merriam&nbsp;&lt;
                <a href="mailto:piper@ethereum.org">piper@ethereum.org</a>&gt;,
                Christopher Gewecke&nbsp;&lt;
                <a href="mailto:christophergewecke@gmail.com">
                  christophergewecke@gmail.com
                </a>
                &gt;, g. nicholas d'andrea&nbsp;&lt;
                <a href="mailto:nick.dandrea@consensys.net">
                  nick.dandrea@consensys.net
                </a>
                &gt;, Nick Gheorghita&nbsp;(
                <a href="https://github.com/njgheorghita">@njgheorghita</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1337">1337</a>
              </td>

              <td className="title">Subscriptions on the blockchain</td>
              <td className="author">
                Kevin Owocki&nbsp;&lt;
                <a href="mailto:kevin@gitcoin.co">kevin@gitcoin.co</a>&gt;,
                Andrew Redden&nbsp;&lt;
                <a href="mailto:andrew@blockcrushr.com">
                  andrew@blockcrushr.com
                </a>
                &gt;, Scott Burke&nbsp;&lt;
                <a href="mailto:scott@blockcrushr.com">scott@blockcrushr.com</a>
                &gt;, Kevin Seagraves&nbsp;&lt;
                <a href="mailto:k.s.seagraves@gmail.com">
                  k.s.seagraves@gmail.com
                </a>
                &gt;, Luka Kacil&nbsp;&lt;
                <a href="mailto:luka.kacil@gmail.com">luka.kacil@gmail.com</a>
                &gt;, Štefan Šimec&nbsp;&lt;
                <a href="mailto:stefan.simec@gmail.com">
                  stefan.simec@gmail.com
                </a>
                &gt;, Piotr Kosiński&nbsp;(
                <a href="https://github.com/kosecki123">@kosecki123</a>), ankit
                raj&nbsp;&lt;
                <a href="mailto:tradeninja7@gmail.com">tradeninja7@gmail.com</a>
                &gt;, John Griffin&nbsp;&lt;
                <a href="mailto:john@atchai.com">john@atchai.com</a>&gt;, Nathan
                Creswell&nbsp;&lt;
                <a href="mailto:nathantr@gmail.com">nathantr@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1352">1352</a>
              </td>

              <td className="title">
                Specify restricted address range for precompiles/system
                contracts
              </td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1380">1380</a>
              </td>

              <td className="title">Reduced gas cost for call to self</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Jacques
                Wagener&nbsp;(
                <a href="https://github.com/jacqueswww">@jacqueswww</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1386">1386</a>
              </td>

              <td className="title">Attestation management contract</td>
              <td className="author">
                Weiwu Zhang&nbsp;&lt;
                <a href="mailto:a@colourful.land">a@colourful.land</a>&gt;,
                James Sangalli&nbsp;&lt;
                <a href="mailto:j.l.sangalli@gmail.com">
                  j.l.sangalli@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1387">1387</a>
              </td>

              <td className="title">
                Merkle Tree Attestations with Privacy enabled
              </td>
              <td className="author">
                Weiwu Zhang&nbsp;&lt;
                <a href="mailto:a@colourful.land">a@colourful.land</a>&gt;,
                James Sangalli&nbsp;&lt;
                <a href="mailto:j.l.sangalli@gmail.com">
                  j.l.sangalli@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1388">1388</a>
              </td>

              <td className="title">Attestation Issuers Management List</td>
              <td className="author">
                Weiwu Zhang&nbsp;&lt;
                <a href="mailto:a@colourful.land">a@colourful.land</a>&gt;,
                James Sangalli&nbsp;&lt;
                <a href="mailto:j.l.sangalli@gmail.com">
                  j.l.sangalli@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1417">1417</a>
              </td>

              <td className="title">Poll Standard</td>
              <td className="author">
                Chaitanya Potti&nbsp;(
                <a href="https://github.com/chaitanyapotti">@chaitanyapotti</a>
                ), Partha Bhattacharya&nbsp;(
                <a href="https://github.com/pb25193">@pb25193</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1418">1418</a>
              </td>

              <td className="title">Blockchain Storage Rent Payment</td>
              <td className="author">
                William Entriken&nbsp;(
                <a href="https://github.com/fulldecent">@fulldecent</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1438">1438</a>
              </td>

              <td className="title">
                dApp Components (avatar) &amp; Universal Wallet
              </td>
              <td className="author">
                Jet Lim&nbsp;(
                <a href="https://github.com/Nitro888">@Nitro888</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1444">1444</a>
              </td>

              <td className="title">Localized Messaging with Signal-to-Text</td>
              <td className="author">
                Brooklyn Zelenka&nbsp;(
                <a href="https://github.com/expede">@expede</a>), Jennifer
                Cooper&nbsp;(<a href="https://github.com/jenncoop">@jenncoop</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1450">1450</a>
              </td>

              <td className="title">
                ERC-1450 A compatible security token for issuing and trading
                SEC-compliant securities
              </td>
              <td className="author">
                John Shiple&nbsp;(
                <a href="https://github.com/johnshiple">@johnshiple</a>), Howard
                Marks&nbsp;&lt;
                <a href="mailto:howard@startengine.com">
                  howard@startengine.com
                </a>
                &gt;, David Zhang&nbsp;&lt;
                <a href="mailto:david@startengine.com">david@startengine.com</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1459">1459</a>
              </td>

              <td className="title">Node Discovery via DNS</td>
              <td className="author">
                Felix Lange&nbsp;(<a href="https://github.com/fjl">@fjl</a>),
                Péter Szilágyi&nbsp;(
                <a href="https://github.com/karalabe">@karalabe</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1462">1462</a>
              </td>

              <td className="title">Base Security Token</td>
              <td className="author">
                Maxim Kupriianov&nbsp;&lt;
                <a href="mailto:mk@atlant.io">mk@atlant.io</a>&gt;, Julian
                Svirsky&nbsp;&lt;<a href="mailto:js@atlant.io">js@atlant.io</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1470">1470</a>
              </td>

              <td className="title">
                Smart Contract Weakness Classification (SWC)
              </td>
              <td className="author">
                Gerhard Wagner&nbsp;(
                <a href="https://github.com/thec00n">@thec00n</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1474">1474</a>
              </td>

              <td className="title">Remote procedure call specification</td>
              <td className="author">
                Paul Bouchon&nbsp;&lt;
                <a href="mailto:mail@bitpshr.net">mail@bitpshr.net</a>&gt;, Erik
                Marks&nbsp;(<a href="https://github.com/rekmarks">@rekmarks</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1482">1482</a>
              </td>

              <td className="title">Define a maximum block timestamp drift</td>
              <td className="author">
                Maurelian&nbsp;(
                <a href="https://github.com/Maurelian">@Maurelian</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1484">1484</a>
              </td>

              <td className="title">Digital Identity Aggregator</td>
              <td className="author">
                Anurag Angara&nbsp;&lt;
                <a href="mailto:anurag.angara@gmail.com">
                  anurag.angara@gmail.com
                </a>
                &gt;, Andy Chorlian&nbsp;&lt;
                <a href="mailto:andychorlian@gmail.com">
                  andychorlian@gmail.com
                </a>
                &gt;, Shane Hampton&nbsp;&lt;
                <a href="mailto:shanehampton1@gmail.com">
                  shanehampton1@gmail.com
                </a>
                &gt;, Noah Zinsmeister&nbsp;&lt;
                <a href="mailto:noahwz@gmail.com">noahwz@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1485">1485</a>
              </td>

              <td className="title">TEthashV1</td>
              <td className="author">
                trustfarm&nbsp;&lt;
                <a href="mailto:trustfarm.info@gmail.com">
                  trustfarm.info@gmail.com
                </a>
                &gt;, trustfarm&nbsp;&lt;
                <a href="mailto:cpplover@trustfarm.net">
                  cpplover@trustfarm.net
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1491">1491</a>
              </td>

              <td className="title">
                Human Cost Accounting Standard (Like Gas but for humans)
              </td>
              <td className="author">
                Iamnot Chris&nbsp;(
                <a href="https://github.com/cohabo">@cohabo</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1504">1504</a>
              </td>

              <td className="title">Upgradable Smart Contract</td>
              <td className="author">
                Kaidong Wu&nbsp;&lt;
                <a href="mailto:wukd94@pku.edu.cn">wukd94@pku.edu.cn</a>&gt;,
                Chuqiao Ren&nbsp;&lt;
                <a href="mailto:cr025@bucknell.edu">cr025@bucknell.edu</a>&gt;,
                Ruthia He&nbsp;&lt;
                <a href="mailto:rujiahe@gmail.com">rujiahe@gmail.com</a>&gt;,
                Yun Ma&nbsp;&lt;
                <a href="mailto:mayun@pku.edu.cn">mayun@pku.edu.cn</a>&gt;,
                Xuanzhe Liu&nbsp;&lt;
                <a href="mailto:liuxuanzhe@pku.edu.cn">liuxuanzhe@pku.edu.cn</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1523">1523</a>
              </td>

              <td className="title">
                Standard for Insurance Policies as ERC-721 Non Fungible Tokens
              </td>
              <td className="author">
                Christoph Mussenbrock&nbsp;(
                <a href="https://github.com/christoph2806">@christoph2806</a>)
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
                <a href="https://github.com/chfast">@chfast</a>), Marius Van Der
                Wijden&nbsp;(
                <a href="https://github.com/MariusVanDerWijden">
                  @MariusVanDerWijden
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1577">1577</a>
              </td>

              <td className="title">contenthash field for ENS</td>
              <td className="author">
                Dean Eigenmann&nbsp;&lt;
                <a href="mailto:dean@ens.domains">dean@ens.domains</a>&gt;, Nick
                Johnson&nbsp;&lt;
                <a href="mailto:nick@ens.domains">nick@ens.domains</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1581">1581</a>
              </td>

              <td className="title">
                Non-wallet usage of keys derived from BIP-32 trees
              </td>
              <td className="author">
                Michele Balistreri&nbsp;(
                <a href="https://github.com/bitgamma">@bitgamma</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1588">1588</a>
              </td>

              <td className="title">Hardfork Meta: Ethereum ProgPoW</td>
              <td className="author">
                Ikmyeong Na&nbsp;(
                <a href="https://github.com/naikmyeong">@naikmyeong</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1592">1592</a>
              </td>

              <td className="title">
                Address and ERC20-compliant transfer rules
              </td>
              <td className="author">
                Cyril Lapinte&nbsp;&lt;
                <a href="mailto:cyril.lapinte@mtpelerin.com">
                  cyril.lapinte@mtpelerin.com
                </a>
                &gt;, Laurent Aapro&nbsp;&lt;
                <a href="mailto:laurent.aapro@mtpelerin.com">
                  laurent.aapro@mtpelerin.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1613">1613</a>
              </td>

              <td className="title">Gas stations network</td>
              <td className="author">
                Yoav Weiss&nbsp;&lt;
                <a href="mailto:yoav@tabookey.com">yoav@tabookey.com</a>&gt;,
                Dror Tirosh&nbsp;&lt;
                <a href="mailto:dror@tabookey.com">dror@tabookey.com</a>&gt;,
                Alex Forshtat&nbsp;&lt;
                <a href="mailto:alex@tabookey.com">alex@tabookey.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1616">1616</a>
              </td>

              <td className="title">Attribute Registry Standard</td>
              <td className="author">
                0age&nbsp;(<a href="https://github.com/0age">@0age</a>),
                Santiago Palladino&nbsp;(
                <a href="https://github.com/spalladino">@spalladino</a>), Leo
                Arias&nbsp;(<a href="https://github.com/elopio">@elopio</a>),
                Alejo Salles&nbsp;(<a href="https://github.com/fiiiu">@fiiiu</a>
                ), Stephane Gosselin&nbsp;(
                <a href="https://github.com/thegostep">@thegostep</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1620">1620</a>
              </td>

              <td className="title">Money Streaming</td>
              <td className="author">
                Paul Berg&nbsp;(
                <a href="https://github.com/PaulRBerg">@PaulRBerg</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1633">1633</a>
              </td>

              <td className="title">Re-Fungible Token Standard (RFT)</td>
              <td className="author">
                Billy Rennekamp&nbsp;(
                <a href="https://github.com/okwme">@okwme</a>), Dan
                Long&nbsp;&lt;<a href="mailto:dan@artblx.com">dan@artblx.com</a>
                &gt;, Kiryl Yermakou&nbsp;&lt;
                <a href="mailto:kiryl@artblx.com">kiryl@artblx.com</a>&gt;, Nate
                van der Ende&nbsp;&lt;
                <a href="mailto:nate@artblx.com">nate@artblx.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1681">1681</a>
              </td>

              <td className="title">Temporal Replay Protection</td>
              <td className="author">
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1702">1702</a>
              </td>

              <td className="title">Generalized Account Versioning Scheme</td>
              <td className="author">
                Wei Tang&nbsp;(<a href="https://github.com/sorpaas">@sorpaas</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1710">1710</a>
              </td>

              <td className="title">URL Format for Web3 Browsers</td>
              <td className="author">
                Bruno Barbieri&nbsp;(
                <a href="https://github.com/brunobar79">@brunobar79</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1753">1753</a>
              </td>

              <td className="title">Smart Contract Interface for Licences</td>
              <td className="author">
                Lucas Cullen&nbsp;(
                <a href="https://github.com/BitcoinBrisbane">
                  @BitcoinBrisbane
                </a>
                ), Kai Yeung&nbsp;(
                <a href="https://github.com/CivicKai">@CivicKai</a>), Anna
                Crowley&nbsp;&lt;
                <a href="mailto:annaelizabethcrowley@gmail.com">
                  annaelizabethcrowley@gmail.com
                </a>
                &gt;, Caroline Marshall&nbsp;&lt;
                <a href="mailto:caroline.marshall888@gmail.com">
                  caroline.marshall888@gmail.com
                </a>
                &gt;, Katrina Donaghy&nbsp;&lt;
                <a href="mailto:katrina@civicledger.com">
                  katrina@civicledger.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1761">1761</a>
              </td>

              <td className="title">Scoped Approval Interface</td>
              <td className="author">
                Witek Radomski&nbsp;&lt;
                <a href="mailto:witek@enjin.io">witek@enjin.io</a>&gt;, Andrew
                Cooke&nbsp;&lt;
                <a href="mailto:ac0dem0nk3y@gmail.com">ac0dem0nk3y@gmail.com</a>
                &gt;, James Therien&nbsp;&lt;
                <a href="mailto:james@enjin.io">james@enjin.io</a>&gt;, Eric
                Binet&nbsp;&lt;<a href="mailto:eric@enjin.io">eric@enjin.io</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1767">1767</a>
              </td>

              <td className="title">GraphQL interface to Ethereum node data</td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>), Raúl
                Kripalani&nbsp;(<a href="https://github.com/raulk">@raulk</a>),
                Kris Shinn&nbsp;(<a href="https://github.com/kshinn">@kshinn</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1775">1775</a>
              </td>

              <td className="title">
                App Keys, application specific wallet accounts
              </td>
              <td className="author">
                Vincent Eli&nbsp;(
                <a href="https://github.com/Bunjin">@Bunjin</a>), Dan
                Finlay&nbsp;(
                <a href="https://github.com/DanFinlay">@DanFinlay</a>)
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
                <a href="/EIPS/eip-1812">1812</a>
              </td>

              <td className="title">Ethereum Verifiable Claims</td>
              <td className="author">
                Pelle Braendgaard&nbsp;(
                <a href="https://github.com/pelle">@pelle</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1822">1822</a>
              </td>

              <td className="title">
                Universal Upgradeable Proxy Standard (UUPS)
              </td>
              <td className="author">
                Gabriel Barros&nbsp;&lt;
                <a href="mailto:gabriel@terminal.co">gabriel@terminal.co</a>
                &gt;, Patrick Gallagher&nbsp;&lt;
                <a href="mailto:blockchainbuddha@gmail.com">
                  blockchainbuddha@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1829">1829</a>
              </td>

              <td className="title">
                Precompile for Elliptic Curve Linear Combinations
              </td>
              <td className="author">
                Remco Bloemen&nbsp;&lt;
                <a href="mailto:Recmo@0x.org">Recmo@0x.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1844">1844</a>
              </td>

              <td className="title">ENS Interface Discovery</td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1872">1872</a>
              </td>

              <td className="title">Ethereum Network Upgrade Windows</td>
              <td className="author">
                Danno Ferrin&nbsp;(
                <a href="https://github.com/shemnon">@shemnon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1895">1895</a>
              </td>

              <td className="title">Support for an Elliptic Curve Cycle</td>
              <td className="author">
                Alexandre Belling&nbsp;&lt;
                <a href="mailto:alexandrebelling8@gmail.com">
                  alexandrebelling8@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1898">1898</a>
              </td>

              <td className="title">Add `blockHash` to defaultBlock methods</td>
              <td className="author">
                Charles Cooper&nbsp;(
                <a href="https://github.com/charles-cooper">@charles-cooper</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1900">1900</a>
              </td>

              <td className="title">
                dType - Decentralized Type System for EVM
              </td>
              <td className="author">
                Loredana Cirstea&nbsp;(
                <a href="https://github.com/loredanacirstea">
                  @loredanacirstea
                </a>
                ), Christian Tzurcanu&nbsp;(
                <a href="https://github.com/ctzurcanu">@ctzurcanu</a>)
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
                <a href="/EIPS/eip-1921">1921</a>
              </td>

              <td className="title">dType Functions Extension</td>
              <td className="author">
                Loredana Cirstea&nbsp;(
                <a href="https://github.com/loredanacirstea">
                  @loredanacirstea
                </a>
                ), Christian Tzurcanu&nbsp;(
                <a href="https://github.com/ctzurcanu">@ctzurcanu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1922">1922</a>
              </td>

              <td className="title">zk-SNARK Verifier Standard</td>
              <td className="author">
                Michael Connor&nbsp;&lt;
                <a href="mailto:michael.connor@uk.ey.com">
                  michael.connor@uk.ey.com
                </a>
                &gt;, Chaitanya Konda&nbsp;&lt;
                <a href="mailto:chaitanya.konda@uk.ey.com">
                  chaitanya.konda@uk.ey.com
                </a>
                &gt;, Duncan Westland&nbsp;&lt;
                <a href="mailto:duncan.westland@uk.ey.com">
                  duncan.westland@uk.ey.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1923">1923</a>
              </td>

              <td className="title">zk-SNARK Verifier Registry Standard</td>
              <td className="author">
                Michael Connor&nbsp;&lt;
                <a href="mailto:michael.connor@uk.ey.com">
                  michael.connor@uk.ey.com
                </a>
                &gt;, Chaitanya Konda&nbsp;&lt;
                <a href="mailto:chaitanya.konda@uk.ey.com">
                  chaitanya.konda@uk.ey.com
                </a>
                &gt;, Duncan Westland&nbsp;&lt;
                <a href="mailto:duncan.westland@uk.ey.com">
                  duncan.westland@uk.ey.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1930">1930</a>
              </td>

              <td className="title">
                CALLs with strict gas semantic. Revert if not enough gas
                available.
              </td>
              <td className="author">
                Ronan Sandford&nbsp;(
                <a href="https://github.com/wighawag">@wighawag</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1948">1948</a>
              </td>

              <td className="title">Non-fungible Data Token</td>
              <td className="author">
                Johann Barbie&nbsp;(
                <a href="https://github.com/johannbarbie">@johannbarbie</a>),
                Ben Bollen&nbsp;&lt;<a href="mailto:ben@ost.com">ben@ost.com</a>
                &gt;, pinkiebell&nbsp;(
                <a href="https://github.com/pinkiebell">@pinkiebell</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1959">1959</a>
              </td>

              <td className="title">
                New Opcode to check if a chainID is part of the history of
                chainIDs
              </td>
              <td className="author">
                Ronan Sandford&nbsp;(
                <a href="https://github.com/wighawag">@wighawag</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1962">1962</a>
              </td>

              <td className="title">
                EC arithmetic and pairings with runtime definitions
              </td>
              <td className="author">
                Alex Vlasov&nbsp;(
                <a href="https://github.com/shamatar">@shamatar</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1965">1965</a>
              </td>

              <td className="title">
                Method to check if a chainID is valid at a specific block Number
              </td>
              <td className="author">
                Ronan Sandford&nbsp;(
                <a href="https://github.com/wighawag">@wighawag</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1973">1973</a>
              </td>

              <td className="title">Scalable Rewards</td>
              <td className="author">
                Lee Raj&nbsp;(<a href="https://github.com/lerajk">@lerajk</a>),
                Qin Jian&nbsp;(<a href="https://github.com/qinjian">@qinjian</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1985">1985</a>
              </td>

              <td className="title">Sane limits for certain EVM parameters</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1996">1996</a>
              </td>

              <td className="title">Holdable Token</td>
              <td className="author">
                Julio Faura&nbsp;&lt;
                <a href="mailto:julio@adhara.io">julio@adhara.io</a>&gt;,
                Fernando Paris&nbsp;&lt;
                <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;, Daniel
                Lehrner&nbsp;&lt;
                <a href="mailto:daniel@io.builders">daniel@io.builders</a>&gt;
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
                <a href="/EIPS/eip-2009">2009</a>
              </td>

              <td className="title">Compliance Service</td>
              <td className="author">
                Daniel Lehrner&nbsp;&lt;
                <a href="mailto:daniel@io.builders">daniel@io.builders</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2014">2014</a>
              </td>

              <td className="title">Extended State Oracle</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
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
                Marks&nbsp;(<a href="https://github.com/rekmarks">@rekmarks</a>
                ), Pandapip1&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2018">2018</a>
              </td>

              <td className="title">Clearable Token</td>
              <td className="author">
                Julio Faura&nbsp;&lt;
                <a href="mailto:julio@adhara.io">julio@adhara.io</a>&gt;,
                Fernando Paris&nbsp;&lt;
                <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;, Daniel
                Lehrner&nbsp;&lt;
                <a href="mailto:daniel@io.builders">daniel@io.builders</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2019">2019</a>
              </td>

              <td className="title">Fundable Token</td>
              <td className="author">
                Fernando Paris&nbsp;&lt;
                <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;, Julio
                Faura&nbsp;&lt;
                <a href="mailto:julio@adhara.io">julio@adhara.io</a>&gt;, Daniel
                Lehrner&nbsp;&lt;
                <a href="mailto:daniel@io.builders">daniel@io.builders</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2020">2020</a>
              </td>

              <td className="title">E-Money Standard Token</td>
              <td className="author">
                Julio Faura&nbsp;&lt;
                <a href="mailto:julio@adhara.io">julio@adhara.io</a>&gt;,
                Fernando Paris&nbsp;&lt;
                <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;, Daniel
                Lehrner&nbsp;&lt;
                <a href="mailto:daniel@io.builders">daniel@io.builders</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2021">2021</a>
              </td>

              <td className="title">Payoutable Token</td>
              <td className="author">
                Fernando Paris&nbsp;&lt;
                <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;, Julio
                Faura&nbsp;&lt;
                <a href="mailto:julio@adhara.io">julio@adhara.io</a>&gt;, Daniel
                Lehrner&nbsp;&lt;
                <a href="mailto:daniel@io.builders">daniel@io.builders</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2026">2026</a>
              </td>

              <td className="title">
                State Rent H - Fixed Prepayment for accounts
              </td>
              <td className="author">
                Alexey Akhunov&nbsp;(
                <a href="https://github.com/AlexeyAkhunov">@AlexeyAkhunov</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2027">2027</a>
              </td>

              <td className="title">
                State Rent C - Net contract size accounting
              </td>
              <td className="author">
                Alexey Akhunov&nbsp;(
                <a href="https://github.com/AlexeyAkhunov">@AlexeyAkhunov</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2029">2029</a>
              </td>

              <td className="title">State Rent A - State counters contract</td>
              <td className="author">
                Alexey Akhunov&nbsp;(
                <a href="https://github.com/AlexeyAkhunov">@AlexeyAkhunov</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2031">2031</a>
              </td>

              <td className="title">State Rent B - Net transaction counter</td>
              <td className="author">
                Alexey Akhunov&nbsp;(
                <a href="https://github.com/AlexeyAkhunov">@AlexeyAkhunov</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2035">2035</a>
              </td>

              <td className="title">
                Stateless Clients - Repricing SLOAD and SSTORE to pay for block
                proofs
              </td>
              <td className="author">
                Alexey Akhunov&nbsp;(
                <a href="https://github.com/AlexeyAkhunov">@AlexeyAkhunov</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2045">2045</a>
              </td>

              <td className="title">Particle gas costs for EVM opcodes</td>
              <td className="author">
                Casey Detrio&nbsp;(
                <a href="https://github.com/cdetrio">@cdetrio</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2046">2046</a>
              </td>

              <td className="title">
                Reduced gas cost for static calls made to precompiles
              </td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2069">2069</a>
              </td>

              <td className="title">
                Recommendation for using YAML ABI in ERCs/EIPs
              </td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2157">2157</a>
              </td>

              <td className="title">
                dType Storage Extension - Decentralized Type System for EVM
              </td>
              <td className="author">
                Loredana Cirstea&nbsp;(
                <a href="https://github.com/loredanacirstea">
                  @loredanacirstea
                </a>
                ), Christian Tzurcanu&nbsp;(
                <a href="https://github.com/ctzurcanu">@ctzurcanu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2193">2193</a>
              </td>

              <td className="title">
                dType Alias Extension - Decentralized Type System
              </td>
              <td className="author">
                Loredana Cirstea&nbsp;(
                <a href="https://github.com/loredanacirstea">
                  @loredanacirstea
                </a>
                ), Christian Tzurcanu&nbsp;(
                <a href="https://github.com/ctzurcanu">@ctzurcanu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2242">2242</a>
              </td>

              <td className="title">Transaction Postdata</td>
              <td className="author">
                John Adler&nbsp;(
                <a href="https://github.com/adlerjohn">@adlerjohn</a>)
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
                <a href="/EIPS/eip-2294">2294</a>
              </td>

              <td className="title">Explicit bound to Chain ID size</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2304">2304</a>
              </td>

              <td className="title">Multichain address resolution for ENS</td>
              <td className="author">
                Nick Johnson&nbsp;&lt;
                <a href="mailto:nick@ens.domains">nick@ens.domains</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2327">2327</a>
              </td>

              <td className="title">BEGINDATA opcode</td>
              <td className="author">
                Martin Lundfall&nbsp;(
                <a href="https://github.com/MrChico">@MrChico</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2330">2330</a>
              </td>

              <td className="title">EXTSLOAD opcode</td>
              <td className="author">
                Dominic Letz&nbsp;(
                <a href="https://github.com/dominicletz">@dominicletz</a>),
                Santiago Palladino&nbsp;(
                <a href="https://github.com/spalladino">@spalladino</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2333">2333</a>
              </td>

              <td className="title">BLS12-381 Key Generation</td>
              <td className="author">
                Carl Beekhuizen (@CarlBeek)&nbsp;&lt;
                <a href="mailto:carl@ethereum.org">carl@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2334">2334</a>
              </td>

              <td className="title">
                BLS12-381 Deterministic Account Hierarchy
              </td>
              <td className="author">
                Carl Beekhuizen (@CarlBeek)&nbsp;&lt;
                <a href="mailto:carl@ethereum.org">carl@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2335">2335</a>
              </td>

              <td className="title">BLS12-381 Keystore</td>
              <td className="author">
                Carl Beekhuizen (@CarlBeek)&nbsp;&lt;
                <a href="mailto:carl@ethereum.org">carl@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2378">2378</a>
              </td>

              <td className="title">EIPs Eligible for Inclusion</td>
              <td className="author">
                James Hancock&nbsp;(
                <a href="https://github.com/MadeofTin">@MadeofTin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2386">2386</a>
              </td>

              <td className="title">
                Ethereum 2 Hierarchical Deterministic Walletstore
              </td>
              <td className="author">
                Jim McDonald&nbsp;&lt;
                <a href="mailto:Jim@mcdee.net">Jim@mcdee.net</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2390">2390</a>
              </td>

              <td className="title">Geo-ENS</td>
              <td className="author">
                James Choncholas&nbsp;(
                <a href="https://github.com/james-choncholas">
                  @james-choncholas
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2400">2400</a>
              </td>

              <td className="title">Transaction Receipt URI</td>
              <td className="author">
                Ricardo Guilherme Schmidt&nbsp;(
                <a href="https://github.com/3esmit">@3esmit</a>), Eric
                Dvorsak&nbsp;(<a href="https://github.com/yenda">@yenda</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2470">2470</a>
              </td>

              <td className="title">Singleton Factory</td>
              <td className="author">
                Ricardo Guilherme Schmidt&nbsp;(
                <a href="https://github.com/3esmit">@3esmit</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2474">2474</a>
              </td>

              <td className="title">Coinbase calls</td>
              <td className="author">
                Ricardo Guilherme Schmidt&nbsp;(
                <a href="https://github.com/3esmit">@3esmit</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2477">2477</a>
              </td>

              <td className="title">Token Metadata Integrity</td>
              <td className="author">
                Kristijan Sedlak&nbsp;(
                <a href="https://github.com/xpepermint">@xpepermint</a>),
                William Entriken&nbsp;&lt;
                <a href="mailto:github.com@phor.net">github.com@phor.net</a>
                &gt;, Witek Radomski&nbsp;&lt;
                <a href="mailto:witek@enjin.io">witek@enjin.io</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2488">2488</a>
              </td>

              <td className="title">Deprecate the CALLCODE opcode</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2494">2494</a>
              </td>

              <td className="title">Baby Jubjub Elliptic Curve</td>
              <td className="author">
                Barry WhiteHat&nbsp;(
                <a href="https://github.com/barryWhiteHat">@barryWhiteHat</a>),
                Marta Bellés&nbsp;(
                <a href="https://github.com/bellesmarta">@bellesmarta</a>),
                Jordi Baylina&nbsp;(
                <a href="https://github.com/jbaylina">@jbaylina</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2515">2515</a>
              </td>

              <td className="title">Implement Difficulty Freeze</td>
              <td className="author">
                James Hancock&nbsp;(
                <a href="https://github.com/madeoftin">@madeoftin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2520">2520</a>
              </td>

              <td className="title">Multiple contenthash records for ENS</td>
              <td className="author">
                Filip Štamcar&nbsp;(
                <a href="https://github.com/filips123">@filips123</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2525">2525</a>
              </td>

              <td className="title">ENSLogin</td>
              <td className="author">
                Hadrien Croubois&nbsp;(
                <a href="https://github.com/amxx">@amxx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2542">2542</a>
              </td>

              <td className="title">New opcodes TXGASLIMIT and CALLGASLIMIT</td>
              <td className="author">
                Alex Forshtat&nbsp;&lt;
                <a href="mailto:forshtat1@gmail.com">forshtat1@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2544">2544</a>
              </td>

              <td className="title">ENS Wildcard Resolution</td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>),
                0age&nbsp;(<a href="https://github.com/0age">@0age</a>)
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
                <a href="/EIPS/eip-2569">2569</a>
              </td>

              <td className="title">
                Saving and Displaying Image Onchain for Universal Tokens
              </td>
              <td className="author">
                Hua Zhang&nbsp;(<a href="https://github.com/dgczhh">@dgczhh</a>
                ), Yuefei Tan&nbsp;(
                <a href="https://github.com/whtyfhas">@whtyfhas</a>), Derek
                Zhou&nbsp;(<a href="https://github.com/zhous">@zhous</a>), Ran
                Xing&nbsp;(
                <a href="https://github.com/lemontreeran">@lemontreeran</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2583">2583</a>
              </td>

              <td className="title">Penalty for account trie misses</td>
              <td className="author">
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2584">2584</a>
              </td>

              <td className="title">
                Trie format transition with overlay trees
              </td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2593">2593</a>
              </td>

              <td className="title">
                Escalator fee market change for ETH 1.0 chain
              </td>
              <td className="author">
                Dan Finlay&nbsp;&lt;
                <a href="mailto:dan@danfinlay.com">dan@danfinlay.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2615">2615</a>
              </td>

              <td className="title">
                Non-Fungible Token with mortgage and rental functions
              </td>
              <td className="author">
                Kohshi Shiba&nbsp;&lt;
                <a href="mailto:kohshi.shiba@gmail.com">
                  kohshi.shiba@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2645">2645</a>
              </td>

              <td className="title">
                Hierarchical Deterministic Wallet for Layer-2
              </td>
              <td className="author">
                Tom Brand&nbsp;&lt;
                <a href="mailto:tom@starkware.co">tom@starkware.co</a>&gt;,
                Louis Guthmann&nbsp;&lt;
                <a href="mailto:louis@starkware.co">louis@starkware.co</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2657">2657</a>
              </td>

              <td className="title">Ephemeral Testnet Yolo</td>
              <td className="author">
                James Hancock&nbsp;(
                <a href="https://github.com/madeoftin">@madeoftin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2666">2666</a>
              </td>

              <td className="title">
                Repricing of precompiles and Keccak256 function
              </td>
              <td className="author">
                Alex Vlasov&nbsp;(
                <a href="https://github.com/shamatar">@shamatar</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2680">2680</a>
              </td>

              <td className="title">Ethereum 2 wallet layout</td>
              <td className="author">
                Jim McDonald&nbsp;&lt;
                <a href="mailto:Jim@mcdee.net">Jim@mcdee.net</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2746">2746</a>
              </td>

              <td className="title">Rules Engine Standard</td>
              <td className="author">
                Aaron Kendall&nbsp;(
                <a href="https://github.com/jaerith">@jaerith</a>), Juan
                Blanco&nbsp;(
                <a href="https://github.com/juanfranblanco">@juanfranblanco</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2767">2767</a>
              </td>

              <td className="title">Contract Ownership Governance</td>
              <td className="author">
                Soham Zemse&nbsp;(<a href="https://github.com/zemse">@zemse</a>
                ), Nick Mudge&nbsp;(
                <a href="https://github.com/mudgen">@mudgen</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2770">2770</a>
              </td>

              <td className="title">Meta-Transactions Forwarder Contract</td>
              <td className="author">
                Alex Forshtat&nbsp;(
                <a href="https://github.com/forshtat">@forshtat</a>), Dror
                Tirosh&nbsp;(
                <a href="https://github.com/drortirosh">@drortirosh</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2803">2803</a>
              </td>

              <td className="title">Rich Transactions</td>
              <td className="author">
                Micah Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
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

              <td className="title">Add DID related methods to the JSON-RPC</td>
              <td className="author">
                Joel Thorstensson&nbsp;(
                <a href="https://github.com/oed">@oed</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2848">2848</a>
              </td>

              <td className="title">My Own Messages (MOM)</td>
              <td className="author">
                Giuseppe Bertone&nbsp;(
                <a href="https://github.com/Neurone">@Neurone</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2876">2876</a>
              </td>

              <td className="title">Deposit contract and address standard</td>
              <td className="author">
                Jonathan Underwood&nbsp;(
                <a href="https://github.com/junderw">@junderw</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2917">2917</a>
              </td>

              <td className="title">Staking Reward Calculation</td>
              <td className="author">
                Tony Carson&nbsp;&lt;
                <a href="mailto:tony.carsonn@gmail.com">
                  tony.carsonn@gmail.com
                </a>
                &gt;, Mehmet Sabir Kiraz&nbsp;&lt;
                <a href="mailto:m.kiraz@gmail.com">m.kiraz@gmail.com</a>&gt;,
                Süleyman Kardaş&nbsp;&lt;
                <a href="mailto:skardas@gmail.com">skardas@gmail.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2926">2926</a>
              </td>

              <td className="title">Chunk-Based Code Merkleization</td>
              <td className="author">
                Sina Mahmoodi&nbsp;(<a href="https://github.com/s1na">@s1na</a>
                ), Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2936">2936</a>
              </td>

              <td className="title">
                EXTCLEAR Opcode For SELFDESTRUCTed contracts
              </td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2937">2937</a>
              </td>

              <td className="title">SET_INDESTRUCTIBLE opcode</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2938">2938</a>
              </td>

              <td className="title">Account Abstraction</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Ansgar
                Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>), Matt
                Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>), Will
                Villanueva&nbsp;(
                <a href="https://github.com/villanuevawill">@villanuevawill</a>
                ), Sam Wilson&nbsp;(
                <a href="https://github.com/SamWilsn">@SamWilsn</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2942">2942</a>
              </td>

              <td className="title">EthPM URI Specification</td>
              <td className="author">
                Nick Gheorghita&nbsp;(
                <a href="https://github.com/njgheorghita">@njgheorghita</a>),
                Piper Merriam&nbsp;(
                <a href="https://github.com/pipermerriam">@pipermerriam</a>), g.
                nicholas d'andrea&nbsp;(
                <a href="https://github.com/gnidan">@gnidan</a>), Benjamin
                Hauser&nbsp;(
                <a href="https://github.com/iamdefinitelyahuman">
                  @iamdefinitelyahuman
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2970">2970</a>
              </td>

              <td className="title">IS_STATIC opcode</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2980">2980</a>
              </td>

              <td className="title">Swiss Compliant Asset Token</td>
              <td className="author">
                Gianluca Perletti&nbsp;(
                <a href="https://github.com/Perlets9">@Perlets9</a>), Alan
                Scarpellini&nbsp;(
                <a href="https://github.com/alanscarpellini">
                  @alanscarpellini
                </a>
                ), Roberto Gorini&nbsp;(
                <a href="https://github.com/robertogorini">@robertogorini</a>),
                Manuel Olivi&nbsp;(
                <a href="https://github.com/manvel79">@manvel79</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2997">2997</a>
              </td>

              <td className="title">IMPERSONATECALL Opcode</td>
              <td className="author">
                Sergio Demian Lerner&nbsp;(
                <a href="https://github.com/SergioDemianLerner">
                  @SergioDemianLerner
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3000">3000</a>
              </td>

              <td className="title">
                Optimistic enactment governance standard
              </td>
              <td className="author">
                Jorge Izquierdo&nbsp;(
                <a href="https://github.com/izqui">@izqui</a>), Fabien
                Marino&nbsp;(
                <a href="https://github.com/bonustrack">@bonustrack</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3005">3005</a>
              </td>

              <td className="title">Batched meta transactions</td>
              <td className="author">
                Matt&nbsp;(
                <a href="https://github.com/defifuture">@defifuture</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3009">3009</a>
              </td>

              <td className="title">Transfer With Authorization</td>
              <td className="author">
                Peter Jihoon Kim&nbsp;(
                <a href="https://github.com/petejkim">@petejkim</a>), Kevin
                Britz&nbsp;(<a href="https://github.com/kbrizzle">@kbrizzle</a>
                ), David Knott&nbsp;(
                <a href="https://github.com/DavidLKnott">@DavidLKnott</a>)
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
                <a href="/EIPS/eip-3026">3026</a>
              </td>

              <td className="title">BW6-761 curve operations</td>
              <td className="author">
                Youssef El Housni&nbsp;(
                <a href="https://github.com/yelhousni">@yelhousni</a>), Michael
                Connor&nbsp;(
                <a href="https://github.com/iAmMichaelConnor">
                  @iAmMichaelConnor
                </a>
                ), Aurore Guillevic&nbsp;&lt;
                <a href="mailto:aurore.guillevic@inria.fr">
                  aurore.guillevic@inria.fr
                </a>
                &gt;, hujw77&nbsp;(
                <a href="https://github.com/hujw77">@hujw77</a>)
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

              <td className="title">Adds `baseFee` to `eth_getBlockByHash`</td>
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
                <a href="/EIPS/eip-3068">3068</a>
              </td>

              <td className="title">
                Precompile for BN256 HashToCurve Algorithms
              </td>
              <td className="author">
                Dr. Christopher Gorman&nbsp;(
                <a href="https://github.com/chgormanMH">@chgormanMH</a>)
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
                Gomes&nbsp;(<a href="https://github.com/pedrouid">@pedrouid</a>
                ), Pandapip1&nbsp;(
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
                <a href="/EIPS/eip-3102">3102</a>
              </td>

              <td className="title">Binary trie structure</td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Vitalik
                Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3135">3135</a>
              </td>

              <td className="title">Exclusive Claimable Token</td>
              <td className="author">
                Zhenyu Sun&nbsp;(
                <a href="https://github.com/Ungigdu">@Ungigdu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3143">3143</a>
              </td>

              <td className="title">Increase block rewards to 5 ETH</td>
              <td className="author">
                Ben Tinner&nbsp;(
                <a href="https://github.com/Terra854">@Terra854</a>)
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
                <a href="/EIPS/eip-3220">3220</a>
              </td>

              <td className="title">Crosschain Identifier Specification</td>
              <td className="author">
                Weijia Zhang&nbsp;(
                <a href="https://github.com/weijia31415">@weijia31415</a>),
                Peter Robinson&nbsp;(
                <a href="https://github.com/drinkcoffee">@drinkcoffee</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3224">3224</a>
              </td>

              <td className="title">Described Data</td>
              <td className="author">
                Richard Moore&nbsp;(
                <a href="https://github.com/ricmoo">@ricmoo</a>), Nick
                Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3234">3234</a>
              </td>

              <td className="title">Batch Flash Loans</td>
              <td className="author">
                Alberto Cuesta Cañada&nbsp;(
                <a href="https://github.com/albertocuestacanada">
                  @albertocuestacanada
                </a>
                ), Fiona Kobayashi&nbsp;(
                <a href="https://github.com/fifikobayashi">@fifikobayashi</a>),
                fubuloubu&nbsp;(
                <a href="https://github.com/fubuloubu">@fubuloubu</a>), Austin
                Williams&nbsp;(
                <a href="https://github.com/onewayfunction">@onewayfunction</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3238">3238</a>
              </td>

              <td className="title">Difficulty Bomb Delay to Q2/2022</td>
              <td className="author">
                Afri Schoedon&nbsp;(<a href="https://github.com/q9f">@q9f</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3267">3267</a>
              </td>

              <td className="title">Giving Ethereum fees to Future Salaries</td>
              <td className="author">
                Victor Porton&nbsp;(
                <a href="https://github.com/vporton">@vporton</a>), Victor
                Porton&nbsp;&lt;
                <a href="mailto:porton@narod.ru">porton@narod.ru</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3298">3298</a>
              </td>

              <td className="title">Removal of refunds</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Martin
                Swende&nbsp;(<a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3300">3300</a>
              </td>

              <td className="title">Phase out refunds</td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3322">3322</a>
              </td>

              <td className="title">Account gas storage opcodes</td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>)
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
                <a href="/EIPS/eip-3336">3336</a>
              </td>

              <td className="title">Paged memory allocation for the EVM</td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3337">3337</a>
              </td>

              <td className="title">
                Frame pointer support for memory load and store operations
              </td>
              <td className="author">
                Nick Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3368">3368</a>
              </td>

              <td className="title">
                Increase block rewards to 3 ETH, with 2 Year Decay to 1 ETH
                Scheduled
              </td>
              <td className="author">
                Michael D. Carter&nbsp;(
                <a href="https://github.com/BitsBeTrippin">@BitsBeTrippin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3372">3372</a>
              </td>

              <td className="title">5 FNV primes for ethash</td>
              <td className="author">
                mineruniter969&nbsp;(
                <a href="https://github.com/mineruniter969">@mineruniter969</a>
                ), mineruniter969&nbsp;&lt;
                <a href="mailto:mineruniter969@tutanota.com">
                  mineruniter969@tutanota.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3386">3386</a>
              </td>

              <td className="title">ERC-721 and ERC-1155 to ERC-20 Wrapper</td>
              <td className="author">
                Calvin Koder&nbsp;(
                <a href="https://github.com/ashrowz">@ashrowz</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3403">3403</a>
              </td>

              <td className="title">Partial removal of refunds</td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Martin
                Swende&nbsp;(<a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3416">3416</a>
              </td>

              <td className="title">Median Gas Premium</td>
              <td className="author">
                HexZorro&nbsp;(
                <a href="https://github.com/hexzorro">@hexzorro</a>), Mojtaba
                Tefagh&nbsp;(<a href="https://github.com/mtefagh">@mtefagh</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3436">3436</a>
              </td>

              <td className="title">Expanded Clique Block Choice Rule</td>
              <td className="author">
                Danno Ferrin&nbsp;(
                <a href="https://github.com/shemnon">@shemnon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3440">3440</a>
              </td>

              <td className="title">ERC-721 Editions Standard</td>
              <td className="author">
                Nathan Ginnever&nbsp;(
                <a href="https://github.com/nginnever">@nginnever</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3450">3450</a>
              </td>

              <td className="title">
                Standardized Shamir Secret Sharing Scheme for BIP-39 Mnemonics
              </td>
              <td className="author">
                Daniel Streit&nbsp;(
                <a href="https://github.com/danielstreit">@danielstreit</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3455">3455</a>
              </td>

              <td className="title">SUDO Opcode</td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>),
                Baptiste Vauthey&nbsp;(
                <a href="https://github.com/thabaptiser">@thabaptiser</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3508">3508</a>
              </td>

              <td className="title">Transaction Data Opcodes</td>
              <td className="author">
                Alex Papageorgiou&nbsp;(
                <a href="https://github.com/alex-ppg">@alex-ppg</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3520">3520</a>
              </td>

              <td className="title">Transaction Destination Opcode</td>
              <td className="author">
                Alex Papageorgiou&nbsp;(
                <a href="https://github.com/alex-ppg">@alex-ppg</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3521">3521</a>
              </td>

              <td className="title">Reduce access list cost</td>
              <td className="author">
                Matt Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3534">3534</a>
              </td>

              <td className="title">
                Restricted Chain Context Type Transactions
              </td>
              <td className="author">
                Isaac Ardis&nbsp;(
                <a href="https://github.com/whilei">@whilei</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3561">3561</a>
              </td>

              <td className="title">Trust Minimized Upgradeability Proxy</td>
              <td className="author">
                Sam Porter&nbsp;(
                <a href="https://github.com/SamPorter1984">@SamPorter1984</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3569">3569</a>
              </td>

              <td className="title">Sealed NFT Metadata Standard</td>
              <td className="author">
                Sean Papanikolas&nbsp;(
                <a href="https://github.com/pizzarob">@pizzarob</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3584">3584</a>
              </td>

              <td className="title">Block Access List</td>
              <td className="author">
                Gajinder Singh&nbsp;(
                <a href="https://github.com/g11in">@g11in</a>), Piper
                Merriam&nbsp;(
                <a href="https://github.com/pipermerriam">@pipermerriam</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3589">3589</a>
              </td>

              <td className="title">Assemble assets into NFTs</td>
              <td className="author">
                Zhenyu Sun&nbsp;(
                <a href="https://github.com/Ungigdu">@Ungigdu</a>), Xinqi
                Yang&nbsp;(<a href="https://github.com/xinqiyang">@xinqiyang</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3690">3690</a>
              </td>

              <td className="title">EOF - JUMPDEST Table</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Andrei Maiboroda&nbsp;(
                <a href="https://github.com/gumb0">@gumb0</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3709">3709</a>
              </td>

              <td className="title">Remove Support for Type 1 Transactions</td>
              <td className="author">
                Gregory Markou&nbsp;(
                <a href="https://github.com/GregTheGreek">@GregTheGreek</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3722">3722</a>
              </td>

              <td className="title">Poster</td>
              <td className="author">
                Auryn Macmillan&nbsp;(
                <a href="https://github.com/auryn-macmillan">
                  @auryn-macmillan
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3754">3754</a>
              </td>

              <td className="title">A Vanilla Non-Fungible Token Standard</td>
              <td className="author">
                Simon Tian&nbsp;(
                <a href="https://github.com/simontianx">@simontianx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3756">3756</a>
              </td>

              <td className="title">Gas Limit Cap</td>
              <td className="author">
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3770">3770</a>
              </td>

              <td className="title">Chain-specific addresses</td>
              <td className="author">
                Lukas Schor&nbsp;(
                <a href="https://github.com/lukasschor">@lukasschor</a>),
                Richard Meissner&nbsp;(
                <a href="https://github.com/rmeissner">@rmeissner</a>), Pedro
                Gomes&nbsp;(<a href="https://github.com/pedrouid">@pedrouid</a>
                ), ligi&nbsp;&lt;<a href="mailto:ligi@ligi.de">ligi@ligi.de</a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3772">3772</a>
              </td>

              <td className="title">Compressed Integers</td>
              <td className="author">
                Soham Zemse&nbsp;(<a href="https://github.com/zemse">@zemse</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3788">3788</a>
              </td>

              <td className="title">Strict enforcement of chainId</td>
              <td className="author">
                Gregory Markou&nbsp;(
                <a href="https://github.com/GregTheGreek">@GregTheGreek</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3978">3978</a>
              </td>

              <td className="title">Gas refunds on reverts</td>
              <td className="author">
                Anton Bukov&nbsp;(<a href="https://github.com/k06a">@k06a</a>),
                Mikhail Melnik&nbsp;(
                <a href="https://github.com/ZumZoom">@ZumZoom</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4341">4341</a>
              </td>

              <td className="title">Ordered NFT Batch Standard</td>
              <td className="author">
                Simon Tian&nbsp;(
                <a href="https://github.com/simontianx">@simontianx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4353">4353</a>
              </td>

              <td className="title">Interface for Staked Tokens in NFTs</td>
              <td className="author">
                Rex Creed&nbsp;(
                <a href="https://github.com/aug2uag">@aug2uag</a>), Dane
                Scarborough&nbsp;&lt;
                <a href="mailto:dane@nftapps.us">dane@nftapps.us</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4393">4393</a>
              </td>

              <td className="title">Micropayments for NFTs and Multi Tokens</td>
              <td className="author">
                Jules Lai&nbsp;(
                <a href="https://github.com/julesl23">@julesl23</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4396">4396</a>
              </td>

              <td className="title">Time-Aware Base Fee Calculation</td>
              <td className="author">
                Ansgar Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4430">4430</a>
              </td>

              <td className="title">Described Transactions</td>
              <td className="author">
                Richard Moore&nbsp;(
                <a href="https://github.com/ricmoo">@ricmoo</a>), Nick
                Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4444">4444</a>
              </td>

              <td className="title">
                Bound Historical Data in Execution Clients
              </td>
              <td className="author">
                George Kadianakis&nbsp;(
                <a href="https://github.com/asn-d6">@asn-d6</a>),
                lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>), Alex
                Stokes&nbsp;(
                <a href="https://github.com/ralexstokes">@ralexstokes</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4488">4488</a>
              </td>

              <td className="title">
                Transaction calldata gas cost reduction with total calldata
                limit
              </td>
              <td className="author">
                Vitalik Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Ansgar
                Dietrichs&nbsp;(
                <a href="https://github.com/adietrichs">@adietrichs</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4494">4494</a>
              </td>

              <td className="title">Permit for ERC-721 NFTs</td>
              <td className="author">
                Simon Fremaux&nbsp;(
                <a href="https://github.com/dievardump">@dievardump</a>),
                William Schwab&nbsp;(
                <a href="https://github.com/wschwab">@wschwab</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4520">4520</a>
              </td>

              <td className="title">
                Multi-byte opcodes prefixed by EB and EC.
              </td>
              <td className="author">
                Brayton Goodall&nbsp;(
                <a href="https://github.com/Spore-Druid-Bray">
                  @Spore-Druid-Bray
                </a>
                ), Mihir Faujdar&nbsp;(
                <a href="https://github.com/uink45">@uink45</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4521">4521</a>
              </td>

              <td className="title">721/20-compatible transfer</td>
              <td className="author">
                Ross Campbell&nbsp;(
                <a href="https://github.com/z0r0z">@z0r0z</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4524">4524</a>
              </td>

              <td className="title">Safer ERC-20</td>
              <td className="author">
                William Schwab&nbsp;(
                <a href="https://github.com/wschwab">@wschwab</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4527">4527</a>
              </td>

              <td className="title">
                QR Code transmission protocol for wallets
              </td>
              <td className="author">
                Aaron Chen&nbsp;(
                <a href="https://github.com/aaronisme">@aaronisme</a>), Sora
                Lee&nbsp;(<a href="https://github.com/soralit">@soralit</a>),
                ligi&nbsp;(<a href="https://github.com/ligi">@ligi</a>), Dan
                Miller&nbsp;(<a href="https://github.com/danjm">@danjm</a>),
                AndreasGassmann&nbsp;(
                <a href="https://github.com/andreasgassmann">
                  @andreasgassmann
                </a>
                ), xardass&nbsp;(
                <a href="https://github.com/xardass">@xardass</a>), Lixin
                Liu&nbsp;(
                <a href="https://github.com/BitcoinLixin">@BitcoinLixin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4546">4546</a>
              </td>

              <td className="title">Wrapped Deposits</td>
              <td className="author">
                Justice Hudson&nbsp;(
                <a href="https://github.com/jchancehud">@jchancehud</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4573">4573</a>
              </td>

              <td className="title">Procedures for the EVM</td>
              <td className="author">
                Greg Colvin&nbsp;(
                <a href="https://github.com/gcolvin">@gcolvin</a>), Greg
                Colvin&nbsp;&lt;
                <a href="mailto:greg@colvin.org">greg@colvin.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4671">4671</a>
              </td>

              <td className="title">Non-Tradable Tokens Standard</td>
              <td className="author">
                Omar Aflak&nbsp;(
                <a href="https://github.com/omaraflak">@omaraflak</a>), Pol-Malo
                Le Bris, Marvin Martin&nbsp;(
                <a href="https://github.com/MarvinMartin24">@MarvinMartin24</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4675">4675</a>
              </td>

              <td className="title">Multi-Fractional Non-Fungible Tokens</td>
              <td className="author">
                David Kim&nbsp;(
                <a href="https://github.com/powerstream3604">
                  @powerstream3604
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4747">4747</a>
              </td>

              <td className="title">Simplify EIP-161</td>
              <td className="author">
                Peter Davies&nbsp;(
                <a href="https://github.com/petertdavies">@petertdavies</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4758">4758</a>
              </td>

              <td className="title">Deactivate SELFDESTRUCT</td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Vitalik
                Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Dankrad
                Feist&nbsp;(<a href="https://github.com/dankrad">@dankrad</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4760">4760</a>
              </td>

              <td className="title">SELFDESTRUCT bomb</td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>), Vitalik
                Buterin&nbsp;(
                <a href="https://github.com/vbuterin">@vbuterin</a>), Dankrad
                Feist&nbsp;(<a href="https://github.com/dankrad">@dankrad</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4799">4799</a>
              </td>

              <td className="title">
                Non-Fungible Token Ownership Designation Standard
              </td>
              <td className="author">
                David Buckman&nbsp;(
                <a href="https://github.com/davidbuckman">@davidbuckman</a>),
                Isaac Buckman&nbsp;(
                <a href="https://github.com/isaacbuckman">@isaacbuckman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4803">4803</a>
              </td>

              <td className="title">
                Limit transaction gas to a maximum of 2^63-1
              </td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4863">4863</a>
              </td>

              <td className="title">Beacon chain push withdrawals</td>
              <td className="author">
                Alex Stokes&nbsp;(
                <a href="https://github.com/ralexstokes">@ralexstokes</a>),
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4885">4885</a>
              </td>

              <td className="title">Subscription NFTs and Multi Tokens</td>
              <td className="author">
                Jules Lai&nbsp;(
                <a href="https://github.com/julesl23">@julesl23</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4886">4886</a>
              </td>

              <td className="title">Proxy Ownership Register</td>
              <td className="author">
                Omnus Sunmo&nbsp;(<a href="https://github.com/omnus">@omnus</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4931">4931</a>
              </td>

              <td className="title">Generic Token Upgrade Standard</td>
              <td className="author">
                John Peterson&nbsp;(
                <a href="https://github.com/John-peterson-coinbase">
                  @John-peterson-coinbase
                </a>
                ), Roberto Bayardo&nbsp;(
                <a href="https://github.com/roberto-bayardo">
                  @roberto-bayardo
                </a>
                ), David Núñez&nbsp;(
                <a href="https://github.com/cygnusv">@cygnusv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4944">4944</a>
              </td>

              <td className="title">
                Contract with Exactly One Non-fungible Token
              </td>
              <td className="author">
                Víctor Muñoz&nbsp;(
                <a href="https://github.com/victormunoz">@victormunoz</a>),
                Josep Lluis de la Rosa&nbsp;(
                <a href="https://github.com/peplluis7">@peplluis7</a>), Andres
                El-Fakdi&nbsp;(
                <a href="https://github.com/Bluezfish">@Bluezfish</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4950">4950</a>
              </td>

              <td className="title">Entangled Tokens</td>
              <td className="author">
                Víctor Muñoz&nbsp;(
                <a href="https://github.com/victormunoz">@victormunoz</a>),
                Josep Lluis de la Rosa&nbsp;(
                <a href="https://github.com/peplluis7">@peplluis7</a>), Easy
                Innova&nbsp;(
                <a href="https://github.com/easyinnova">@easyinnova</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4974">4974</a>
              </td>

              <td className="title">Ratings</td>
              <td className="author">
                Daniel Tedesco&nbsp;(
                <a href="https://github.com/dtedesco1">@dtedesco1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-4987">4987</a>
              </td>

              <td className="title">Held token interface</td>
              <td className="author">
                Devin Conley&nbsp;(
                <a href="https://github.com/devinaconley">@devinaconley</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5000">5000</a>
              </td>

              <td className="title">MULDIV instruction</td>
              <td className="author">
                Harikrishnan Mulackal&nbsp;(
                <a href="https://github.com/hrkrshnn">@hrkrshnn</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>),
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5003">5003</a>
              </td>

              <td className="title">Insert Code into EOAs with AUTHUSURP</td>
              <td className="author">
                Dan Finlay&nbsp;(
                <a href="https://github.com/danfinlay">@danfinlay</a>), Sam
                Wilson&nbsp;(<a href="https://github.com/SamWilsn">@SamWilsn</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5005">5005</a>
              </td>

              <td className="title">Zodiac Modular Accounts</td>
              <td className="author">
                Auryn Macmillan&nbsp;(
                <a href="https://github.com/auryn-macmillan">
                  @auryn-macmillan
                </a>
                ), Kei Kreutler&nbsp;(
                <a href="https://github.com/keikreutler">@keikreutler</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5018">5018</a>
              </td>

              <td className="title">Filesystem-like Interface for Contracts</td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5022">5022</a>
              </td>

              <td className="title">
                Increase price of SSTORE from zero to non-zero to 40k gas
              </td>
              <td className="author">
                Green&nbsp;(
                <a href="https://github.com/greenlucid">@greenlucid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5027">5027</a>
              </td>

              <td className="title">Remove the limit on contract code size</td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5050">5050</a>
              </td>

              <td className="title">
                Interactive NFTs with Modular Environments
              </td>
              <td className="author">
                Alexi&nbsp;(<a href="https://github.com/alexi">@alexi</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5058">5058</a>
              </td>

              <td className="title">Lockable Non-Fungible Tokens</td>
              <td className="author">
                Tyler&nbsp;(
                <a href="https://github.com/radiocaca">@radiocaca</a>),
                Alex&nbsp;(<a href="https://github.com/gojazdev">@gojazdev</a>),
                John&nbsp;(<a href="https://github.com/sfumato00">@sfumato00</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5065">5065</a>
              </td>

              <td className="title">Instruction for transferring ether</td>
              <td className="author">
                Mudit Gupta&nbsp;(
                <a href="https://github.com/maxsam4">@maxsam4</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5081">5081</a>
              </td>

              <td className="title">Expirable Trainsaction</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>), Nick
                Johnson&nbsp;(
                <a href="https://github.com/Arachnid">@Arachnid</a>), Konrad
                Feldmeier&nbsp;&lt;
                <a href="mailto:konrad@brainbot.com">konrad@brainbot.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5094">5094</a>
              </td>

              <td className="title">
                URL Format for Ethereum Network Switching
              </td>
              <td className="author">
                Luc van Kampen&nbsp;(
                <a href="https://github.com/lucemans">@lucemans</a>), Jakob
                Helgesson&nbsp;(
                <a href="https://github.com/svemat01">@svemat01</a>), Joshua
                Hendrix&nbsp;(
                <a href="https://github.com/thejoshuahendrix">
                  @thejoshuahendrix
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5095">5095</a>
              </td>

              <td className="title">Principal Token</td>
              <td className="author">
                Julian Traversa&nbsp;(
                <a href="https://github.com/JTraversa">@JTraversa</a>), Robert
                Robbins&nbsp;(
                <a href="https://github.com/robrobbins">@robrobbins</a>),
                Alberto Cuesta Cañada&nbsp;(
                <a href="https://github.com/alcueca">@alcueca</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5131">5131</a>
              </td>

              <td className="title">SAFE Authentication For ENS</td>
              <td className="author">
                Wilkins Chung (@wwhchung)&nbsp;&lt;
                <a href="mailto:wilkins@manifold.xyz">wilkins@manifold.xyz</a>
                &gt;, Jalil Wahdatehagh&nbsp;(
                <a href="https://github.com/jwahdatehagh">@jwahdatehagh</a>),
                Cry&nbsp;(<a href="https://github.com/crydoteth">@crydoteth</a>
                ), Sillytuna&nbsp;(
                <a href="https://github.com/sillytuna">@sillytuna</a>),
                Cyberpnk&nbsp;(
                <a href="https://github.com/CyberpnkWin">@CyberpnkWin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5139">5139</a>
              </td>

              <td className="title">Remote Procedure Call Provider Lists</td>
              <td className="author">
                Sam Wilson&nbsp;(
                <a href="https://github.com/SamWilsn">@SamWilsn</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5143">5143</a>
              </td>

              <td className="title">Slippage Protection for Tokenized Vault</td>
              <td className="author">
                Hadrien Croubois&nbsp;(
                <a href="https://github.com/amxx">@amxx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5185">5185</a>
              </td>

              <td className="title">NFT Updatable Metadata Extension</td>
              <td className="author">
                Christophe Le Bars&nbsp;(
                <a href="https://github.com/clbrge">@clbrge</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5187">5187</a>
              </td>

              <td className="title">
                Extend EIP-1155 with rentable usage rights
              </td>
              <td className="author">
                DerivStudio&nbsp;(
                <a href="https://github.com/DerivStudio">@DerivStudio</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5218">5218</a>
              </td>

              <td className="title">NFT Rights Management</td>
              <td className="author">
                James Grimmelmann&nbsp;(
                <a href="https://github.com/grimmelm">@grimmelm</a>), Yan
                Ji&nbsp;(<a href="https://github.com/iseriohn">@iseriohn</a>),
                Tyler Kell&nbsp;(
                <a href="https://github.com/relyt29">@relyt29</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5252">5252</a>
              </td>

              <td className="title">Account-bound Finance</td>
              <td className="author">
                Hyungsuk Kang&nbsp;(
                <a href="https://github.com/hskang9">@hskang9</a>), Viktor
                Pernjek&nbsp;(<a href="https://github.com/smuxx">@smuxx</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5283">5283</a>
              </td>

              <td className="title">Semaphore for Reentrancy Protection</td>
              <td className="author">
                Sergio D. Lerner&nbsp;(
                <a href="https://github.com/SergioDemianLerner">
                  @SergioDemianLerner
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5298">5298</a>
              </td>

              <td className="title">ENS Trust to hold NFTs under ENS name</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5334">5334</a>
              </td>

              <td className="title">
                EIP-721 User And Expires And Level Extension
              </td>
              <td className="author">
                Yan&nbsp;(
                <a href="https://github.com/yan253319066">@yan253319066</a>)
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
                <a href="https://github.com/anndro">@anndro</a>), Muhammed Emin
                Aydın&nbsp;(
                <a href="https://github.com/muhammedea">@muhammedea</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5409">5409</a>
              </td>

              <td className="title">EIP-1155 Non-Fungible Token extension</td>
              <td className="author">
                Ronan Sandford&nbsp;(
                <a href="https://github.com/wighawag">@wighawag</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5437">5437</a>
              </td>

              <td className="title">Security Contact Interface</td>
              <td className="author">
                Zainan Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5478">5478</a>
              </td>

              <td className="title">CREATE2COPY Opcode</td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5501">5501</a>
              </td>

              <td className="title">
                Rental &amp; Delegation NFT - EIP-721 Extension
              </td>
              <td className="author">
                Jan Smrža&nbsp;(<a href="https://github.com/smrza">@smrza</a>),
                David Rábel&nbsp;(
                <a href="https://github.com/rabeles11">@rabeles11</a>), Tomáš
                Janča&nbsp;&lt;
                <a href="mailto:tomas.janca@jtbstorage.eu">
                  tomas.janca@jtbstorage.eu
                </a>
                &gt;, Jan Bureš&nbsp;(
                <a href="https://github.com/JohnyX89">@JohnyX89</a>),
                DOBBYLABS&nbsp;(
                <a href="https://github.com/DOBBYLABS">@DOBBYLABS</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5505">5505</a>
              </td>

              <td className="title">EIP-1155 asset backed NFT extension</td>
              <td className="author">
                liszechung&nbsp;(
                <a href="https://github.com/liszechung">@liszechung</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5516">5516</a>
              </td>

              <td className="title">Soulbound Multi-owner Tokens</td>
              <td className="author">
                Lucas Martín Grasso Ramos&nbsp;(
                <a href="https://github.com/LucasGrasso">@LucasGrasso</a>),
                Matias Arazi&nbsp;(
                <a href="https://github.com/MatiArazi">@MatiArazi</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5539">5539</a>
              </td>

              <td className="title">Revocation List Registry</td>
              <td className="author">
                Philipp Bolte&nbsp;(
                <a href="https://github.com/strumswell">@strumswell</a>),
                Lauritz Leifermann&nbsp;(
                <a href="https://github.com/lleifermann">@lleifermann</a>),
                Dennis von der Bey&nbsp;(
                <a href="https://github.com/DennisVonDerBey">
                  @DennisVonDerBey
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5553">5553</a>
              </td>

              <td className="title">
                Representing IP and its Royalty Structure
              </td>
              <td className="author">
                Roy Osherove&nbsp;(
                <a href="https://github.com/royosherove">@royosherove</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5554">5554</a>
              </td>

              <td className="title">
                NFT Legal Use, Repurposing, and Remixing
              </td>
              <td className="author">
                Isaac Patka&nbsp;(
                <a href="https://github.com/ipatka">@ipatka</a>), COALA
                Licensing Taskforce&nbsp;&lt;
                <a href="mailto:info@coala.org">info@coala.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5559">5559</a>
              </td>

              <td className="title">Cross Chain Write Deferral Protocol</td>
              <td className="author">
                Paul Gauvreau&nbsp;(
                <a href="https://github.com/0xpaulio">@0xpaulio</a>), Nick
                Johnson&nbsp;(
                <a href="https://github.com/arachnid">@arachnid</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5560">5560</a>
              </td>

              <td className="title">Redeemable NFTs</td>
              <td className="author">
                Olivier Fernandez&nbsp;(
                <a href="https://github.com/fernandezOli">@fernandezOli</a>),
                Frédéric Le Coidic&nbsp;(
                <a href="https://github.com/FredLC29">@FredLC29</a>), Julien
                Béranger&nbsp;(
                <a href="https://github.com/julienbrg">@julienbrg</a>)
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
                <a href="/EIPS/eip-5630">5630</a>
              </td>

              <td className="title">
                New approach for encryption / decryption
              </td>
              <td className="author">
                Firn Protocol&nbsp;(
                <a href="https://github.com/firnprotocol">@firnprotocol</a>),
                Fried L. Trout, Weiji Guo&nbsp;(
                <a href="https://github.com/weijiguo">@weijiguo</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5633">5633</a>
              </td>

              <td className="title">
                Composable Soulbound NFT, EIP-1155 Extension
              </td>
              <td className="author">
                HonorLabs&nbsp;(
                <a href="https://github.com/honorworldio">@honorworldio</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5635">5635</a>
              </td>

              <td className="title">NFT Licensing Agreements</td>
              <td className="author">
                Timi&nbsp;(<a href="https://github.com/0xTimi">@0xTimi</a>),
                0xTriple7&nbsp;(<a href="https://github.com/ysqi">@ysqi</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5643">5643</a>
              </td>

              <td className="title">Subscription NFTs</td>
              <td className="author">
                cygaar&nbsp;(<a href="https://github.com/cygaar">@cygaar</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5719">5719</a>
              </td>

              <td className="title">Signature replacement interface</td>
              <td className="author">
                Agustin Aguilar&nbsp;(
                <a href="https://github.com/Agusx1211">@Agusx1211</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5744">5744</a>
              </td>

              <td className="title">Latent Fungible Token</td>
              <td className="author">
                Cozy Finance&nbsp;(
                <a href="https://github.com/cozyfinance">@cozyfinance</a>), Tony
                Sheng&nbsp;(
                <a href="https://github.com/tonysheng">@tonysheng</a>), Matt
                Solomon&nbsp;(<a href="https://github.com/mds1">@mds1</a>),
                David Laprade&nbsp;(
                <a href="https://github.com/davidlaprade">@davidlaprade</a>),
                Payom Dousti&nbsp;(
                <a href="https://github.com/payomdousti">@payomdousti</a>), Chad
                Fleming&nbsp;(<a href="https://github.com/chad-js">@chad-js</a>
                ), Franz Chen&nbsp;(
                <a href="https://github.com/Dendrimer">@Dendrimer</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5753">5753</a>
              </td>

              <td className="title">Lockable Extension for EIP-721</td>
              <td className="author">
                Filipp Makarov&nbsp;(
                <a href="https://github.com/filmakarov">@filmakarov</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5805">5805</a>
              </td>

              <td className="title">Voting with delegation</td>
              <td className="author">
                Hadrien Croubois&nbsp;(
                <a href="https://github.com/Amxx">@Amxx</a>), Francisco
                Giordano&nbsp;(<a href="https://github.com/frangio">@frangio</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5827">5827</a>
              </td>

              <td className="title">Auto-renewable allowance extension</td>
              <td className="author">
                zlace&nbsp;(<a href="https://github.com/zlace0x">@zlace0x</a>),
                zhongfu&nbsp;(<a href="https://github.com/zhongfu">@zhongfu</a>
                ), edison0xyz&nbsp;(
                <a href="https://github.com/edison0xyz">@edison0xyz</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5850">5850</a>
              </td>

              <td className="title">
                Complex Numbers stored in `bytes32` types
              </td>
              <td className="author">
                Paul Edge&nbsp;(
                <a href="https://github.com/genkifs">@genkifs</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5851">5851</a>
              </td>

              <td className="title">On-Chain Verifiable Credentials</td>
              <td className="author">
                Yu Liu&nbsp;(
                <a href="https://github.com/yuliu-debond">@yuliu-debond</a>),
                Junyi Zhong&nbsp;(
                <a href="https://github.com/Jooeys">@Jooeys</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5883">5883</a>
              </td>

              <td className="title">Token Transfer by Social Recovery</td>
              <td className="author">
                Erhard Dinhobl&nbsp;(<a href="https://github.com/mrqc">@mrqc</a>
                ), Kevin Riedl&nbsp;(<a href="https://github.com/wsdt">@wsdt</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5902">5902</a>
              </td>

              <td className="title">Smart Contract Event Hooks</td>
              <td className="author">
                Simon Brown&nbsp;(
                <a href="https://github.com/orbmis">@orbmis</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-5988">5988</a>
              </td>

              <td className="title">Add Poseidon hash function precompile</td>
              <td className="author">
                Abdelhamid Bakhta&nbsp;(
                <a href="https://github.com/abdelhamidbakhta">
                  @abdelhamidbakhta
                </a>
                ), Eli Ben Sasson&nbsp;(
                <a href="https://github.com/Elistark">@Elistark</a>), Avihu
                Levy&nbsp;(<a href="https://github.com/avihu28">@avihu28</a>),
                David Levit Gurevich&nbsp;(
                <a href="https://github.com/DavidLevitGurevich">
                  @DavidLevitGurevich
                </a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6046">6046</a>
              </td>

              <td className="title">Replace SELFDESTRUCT with DEACTIVATE</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6047">6047</a>
              </td>

              <td className="title">
                ERC-721 Balance indexing via Transfer event
              </td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
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
                <a href="/EIPS/eip-6188">6188</a>
              </td>

              <td className="title">Nonce Cap</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6189">6189</a>
              </td>

              <td className="title">Alias Contracts</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6190">6190</a>
              </td>

              <td className="title">Verkle-compatible SELFDESTRUCT</td>
              <td className="author">
                Gavin John&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6268">6268</a>
              </td>

              <td className="title">
                Untransferability Indicator for EIP-1155
              </td>
              <td className="author">
                Yuki Aoki&nbsp;(
                <a href="https://github.com/yuki-js">@yuki-js</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6353">6353</a>
              </td>

              <td className="title">Charity token</td>
              <td className="author">
                Aubay&nbsp;&lt;
                <a href="mailto:blockchain-team@aubay.com">
                  blockchain-team@aubay.com
                </a>
                &gt;, BOCA Jeabby&nbsp;(
                <a href="https://github.com/bjeabby1507">@bjeabby1507</a>), EL
                MERSHATI Laith&nbsp;(
                <a href="https://github.com/lth-elm">@lth-elm</a>), KEMP
                Elia&nbsp;(<a href="https://github.com/eliakemp">@eliakemp</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6384">6384</a>
              </td>

              <td className="title">Human-readable offline signatures</td>
              <td className="author">
                Tal Be'ery&nbsp;&lt;
                <a href="mailto:tal@zengo.com">tal@zengo.com</a>&gt;,
                RoiV&nbsp;(<a href="https://github.com/DeVaz1">@DeVaz1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6464">6464</a>
              </td>

              <td className="title">
                Multi-operator, per-token ERC-721 approvals.
              </td>
              <td className="author">
                Cristian Espinoza&nbsp;(
                <a href="https://github.com/crisgarner">@crisgarner</a>), Simon
                Fremaux&nbsp;(
                <a href="https://github.com/dievardump">@dievardump</a>), David
                Huber&nbsp;(<a href="https://github.com/cxkoda">@cxkoda</a>),
                and Arran Schlosberg&nbsp;(
                <a href="https://github.com/aschlosberg">@aschlosberg</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6475">6475</a>
              </td>

              <td className="title">SSZ Optional</td>
              <td className="author">
                Etan Kissling&nbsp;(
                <a href="https://github.com/etan-status">@etan-status</a>),
                Zahary Karadjov&nbsp;(<a href="https://github.com/zah">@zah</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6506">6506</a>
              </td>

              <td className="title">P2P Escrowed Governance Incentives</td>
              <td className="author">
                Josh Weintraub&nbsp;(
                <a href="https://github.com/jhweintraub">@jhweintraub</a>)
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

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6810">6810</a>
              </td>

              <td className="title">Ex Post Facto Cascading Revert</td>
              <td className="author">
                William Morriss&nbsp;(
                <a href="https://github.com/wjmelements">@wjmelements</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6811">6811</a>
              </td>

              <td className="title">To The Moon—10 Minute Blocks</td>
              <td className="author">
                Pandapip1&nbsp;(
                <a href="https://github.com/Pandapip1">@Pandapip1</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6873">6873</a>
              </td>

              <td className="title">Preimage retention</td>
              <td className="author">
                Guillaume Ballet&nbsp;(
                <a href="https://github.com/gballet">@gballet</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6888">6888</a>
              </td>

              <td className="title">Math checking in EVM</td>
              <td className="author">
                Renan Rodrigues de Souza&nbsp;(
                <a href="https://github.com/RenanSouza2">@RenanSouza2</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6968">6968</a>
              </td>

              <td className="title">
                Contract Secured Revenue on an EVM based L2
              </td>
              <td className="author">
                Zak Cole&nbsp;&lt;
                <a href="mailto:zak@numbergroup.xyz">zak@numbergroup.xyz</a>
                &gt;, Zak Cole&nbsp;(
                <a href="https://github.com/zscole">@zscole</a>), Kevin
                Owocki&nbsp;&lt;
                <a href="mailto:kevin@supermodular.xyz">
                  kevin@supermodular.xyz
                </a>
                &gt;, lightclient&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-6988">6988</a>
              </td>

              <td className="title">
                Elected block proposer has not been slashed
              </td>
              <td className="author">
                Mikhail Kalinin&nbsp;(
                <a href="https://github.com/mkalinin">@mkalinin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7266">7266</a>
              </td>

              <td className="title">Remove BLAKE2 compression precompile</td>
              <td className="author">
                Pascal Caversaccio&nbsp;(
                <a href="https://github.com/pcaversaccio">@pcaversaccio</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7378">7378</a>
              </td>

              <td className="title">
                Add time-weighted averaging to the base fee
              </td>
              <td className="author">
                Guy Goren (@guy-goren)&nbsp;&lt;
                <a href="mailto:guy.nahsholim@gmail.com">
                  guy.nahsholim@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7441">7441</a>
              </td>

              <td className="title">
                Upgrade block proposer election to Whisk
              </td>
              <td className="author">
                George Kadianakis&nbsp;(
                <a href="https://github.com/asn-d6">@asn-d6</a>), Justin
                Drake&nbsp;(
                <a href="https://github.com/JustinDrake">@JustinDrake</a>),
                dapplion&nbsp;(
                <a href="https://github.com/dapplion">@dapplion</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7503">7503</a>
              </td>

              <td className="title">Zero-Knowledge Wormholes</td>
              <td className="author">
                Keyvan Kambakhsh&nbsp;(
                <a href="https://github.com/keyvank">@keyvank</a>), Hamid
                Bateni&nbsp;(<a href="https://github.com/irnb">@irnb</a>), Amir
                Kahoori&nbsp;&lt;
                <a href="mailto:a.kahoorizadeh@gmail.com">
                  a.kahoorizadeh@gmail.com
                </a>
                &gt;, Nobitex Labs&nbsp;&lt;
                <a href="mailto:labs@nobitex.ir">labs@nobitex.ir</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7519">7519</a>
              </td>

              <td className="title">
                Atomic Storage Operations SCREDIT and SDEBIT
              </td>
              <td className="author">
                Danno Ferrin&nbsp;(
                <a href="https://github.com/shemnon">@shemnon</a>)
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
                <a href="/EIPS/eip-3">3</a>
              </td>

              <td className="title">Addition of CALLDEPTH opcode</td>
              <td className="author">
                Martin Holst Swende&nbsp;&lt;
                <a href="mailto:martin@swende.se">martin@swende.se</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-67">67</a>
              </td>

              <td className="title">
                URI Scheme with Metadata, Value and Bytecode
              </td>
              <td className="author">
                Alex Van de Sande&nbsp;(
                <a href="https://github.com/alexvansande">@alexvansande</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-875">875</a>
              </td>

              <td className="title">
                Simpler NFT standard with batching and native atomic swaps
              </td>
              <td className="author">
                Weiwu Zhang&nbsp;&lt;
                <a href="mailto:a@colourful.land">a@colourful.land</a>&gt;,
                James Sangalli&nbsp;&lt;
                <a href="mailto:j.l.sangalli@gmail.com">
                  j.l.sangalli@gmail.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-908">908</a>
              </td>

              <td className="title">
                Reward clients for a sustainable network
              </td>
              <td className="author">
                James Ray&nbsp;(
                <a href="https://github.com/jamesray1">@jamesray1</a>), Micah
                Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-999">999</a>
              </td>

              <td className="title">
                Restore Contract Code at
                0x863DF6BFa4469f3ead0bE8f9F2AAE51c91A907b4
              </td>
              <td className="author">
                Afri Schoedon&nbsp;(
                <a href="https://github.com/5chdn">@5chdn</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1123">1123</a>
              </td>

              <td className="title">
                Revised Ethereum Smart Contract Packaging Standard
              </td>
              <td className="author">
                g. nicholas d’andrea&nbsp;(
                <a href="https://github.com/gnidan">@gnidan</a>), Piper
                Merriam&nbsp;(
                <a href="https://github.com/pipermerriam">@pipermerriam</a>),
                Nick Gheorghita&nbsp;(
                <a href="https://github.com/njgheorghita">@njgheorghita</a>),
                Danny Ryan&nbsp;(<a href="https://github.com/djrtwo">@djrtwo</a>
                )
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1154">1154</a>
              </td>

              <td className="title">Oracle Interface</td>
              <td className="author">
                Alan Lu&nbsp;(<a href="https://github.com/cag">@cag</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1240">1240</a>
              </td>

              <td className="title">Remove Difficulty Bomb</td>
              <td className="author">
                Micah Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1355">1355</a>
              </td>

              <td className="title">Ethash 1a</td>
              <td className="author">
                Paweł Bylica&nbsp;(
                <a href="https://github.com/chfast">@chfast</a>), Jean M.
                Cyr&nbsp;(
                <a href="https://github.com/jean-m-cyr">@jean-m-cyr</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1538">1538</a>
              </td>

              <td className="title">Transparent Contract Standard</td>
              <td className="author">
                Nick Mudge&nbsp;&lt;
                <a href="mailto:nick@perfectabstractions.com">
                  nick@perfectabstractions.com
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1682">1682</a>
              </td>

              <td className="title">Storage Rent</td>
              <td className="author">
                Felix J Lange&nbsp;(<a href="https://github.com/fjl">@fjl</a>),
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1706">1706</a>
              </td>

              <td className="title">
                Disable SSTORE with gasleft lower than call stipend
              </td>
              <td className="author">
                Alex Forshtat&nbsp;&lt;
                <a href="mailto:alex@tabookey.com">alex@tabookey.com</a>&gt;,
                Yoav Weiss&nbsp;&lt;
                <a href="mailto:yoav@tabookey.com">yoav@tabookey.com</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-1890">1890</a>
              </td>

              <td className="title">
                Commitment to Sustainable Ecosystem Funding
              </td>
              <td className="author">
                Gregory Markou&nbsp;&lt;
                <a href="mailto:greg@chainsafe.io">greg@chainsafe.io</a>&gt;,
                Kevin Owocki&nbsp;&lt;
                <a href="mailto:kevin@gitcoin.co">kevin@gitcoin.co</a>&gt;, Lane
                Rettig&nbsp;&lt;
                <a href="mailto:lane@ethereum.org">lane@ethereum.org</a>&gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2025">2025</a>
              </td>

              <td className="title">
                Block Rewards Proposal for funding Eth1.x
              </td>
              <td className="author">
                James Hancock&nbsp;(
                <a href="https://github.com/madeoftin">@madeoftin</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2070">2070</a>
              </td>

              <td className="title">Hardfork Meta: Berlin</td>
              <td className="author">
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2315">2315</a>
              </td>

              <td className="title">Simple Subroutines for the EVM</td>
              <td className="author">
                Greg Colvin&nbsp;(
                <a href="https://github.com/gcolvin">@gcolvin</a>), Martin Holst
                Swende&nbsp;(<a href="https://github.com/holiman">@holiman</a>),
                Brooklyn Zelenka&nbsp;(
                <a href="https://github.com/expede">@expede</a>), John Max
                Skaller&nbsp;&lt;
                <a href="mailto:skaller@internode.on.net">
                  skaller@internode.on.net
                </a>
                &gt;
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2458">2458</a>
              </td>

              <td className="title">Updates and Updated-by Header</td>
              <td className="author">
                Edson Ayllon&nbsp;(
                <a href="https://github.com/edsonayllon">@edsonayllon</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2677">2677</a>
              </td>

              <td className="title">Limit size of `initcode`</td>
              <td className="author">
                Martin Holst Swende&nbsp;(
                <a href="https://github.com/holiman">@holiman</a>), Paweł
                Bylica&nbsp;(<a href="https://github.com/chfast">@chfast</a>),
                Alex Beregszaszi&nbsp;(
                <a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2711">2711</a>
              </td>

              <td className="title">
                Sponsored, expiring and batch transactions.
              </td>
              <td className="author">
                Micah Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2733">2733</a>
              </td>

              <td className="title">Transaction Package</td>
              <td className="author">
                Matt Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2780">2780</a>
              </td>

              <td className="title">Reduce intrinsic transaction gas</td>
              <td className="author">
                Matt Garnett&nbsp;(
                <a href="https://github.com/lightclient">@lightclient</a>), Uri
                Klarman&nbsp;(
                <a href="https://github.com/uriklarman">@uriklarman</a>)
              </td>
            </tr>

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
                Marks&nbsp;(<a href="https://github.com/rekmarks">@rekmarks</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-2972">2972</a>
              </td>

              <td className="title">Wrapped Legacy Transactions</td>
              <td className="author">
                Micah Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3332">3332</a>
              </td>

              <td className="title">MEDGASPRICE Opcode</td>
              <td className="author">
                Justice Hudson&nbsp;(
                <a href="https://github.com/jchancehud">@jchancehud</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3338">3338</a>
              </td>

              <td className="title">Limit account nonce to 2^52</td>
              <td className="author">
                Micah Zoltu&nbsp;(
                <a href="https://github.com/MicahZoltu">@MicahZoltu</a>), Alex
                Beregszaszi&nbsp;(<a href="https://github.com/axic">@axic</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3374">3374</a>
              </td>

              <td className="title">
                Predictable Proof-of-Work (POW) Sunsetting
              </td>
              <td className="author">
                Query0x&nbsp;(<a href="https://github.com/Query0x">@Query0x</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3382">3382</a>
              </td>

              <td className="title">Hardcoded Block Gas Limit</td>
              <td className="author">
                Philippe Castonguay&nbsp;(
                <a href="https://github.com/PhABC">@PhABC</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-3779">3779</a>
              </td>

              <td className="title">Safer Control Flow for the EVM</td>
              <td className="author">
                Greg Colvin&nbsp;(
                <a href="https://github.com/gcolvin">@gcolvin</a>), Greg
                Colvin&nbsp;&lt;
                <a href="mailto:greg@colvin.org">greg@colvin.org</a>&gt;,
                Brooklyn Zelenka&nbsp;(
                <a href="https://github.com/expede">@expede</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7199">7199</a>
              </td>

              <td className="title">Linter Scope</td>
              <td className="author">
                Zainan Victor Zhou&nbsp;(
                <a href="https://github.com/xinbenlv">@xinbenlv</a>)
              </td>
            </tr>

            <tr>
              <td className="eipnum">
                <a href="/EIPS/eip-7664">7664</a>
              </td>

              <td className="title">Access-Key opcode</td>
              <td className="author">
                Diederik Loerakker&nbsp;(
                <a href="https://github.com/protolambda">@protolambda</a>)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
