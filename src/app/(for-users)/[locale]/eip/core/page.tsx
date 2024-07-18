'use client'

import '../style.css'
export default function ForCorePage() {
  return (
    <div className="w-full gap-4 flex flex-col">
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

        <h1 className="post-title">Core</h1>
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
                <a href="/EIPS/eip-7523">7523</a>
              </td>

              <td className="date">2024-03-26</td>

              <td className="title">Empty accounts deprecation</td>
              <td className="author">
                Peter Davies&nbsp;(
                <a href="https://github.com/petertdavies">@petertdavies</a>)
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
                <a href="/EIPS/eip-5478">5478</a>
              </td>

              <td className="title">CREATE2COPY Opcode</td>
              <td className="author">
                Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>)
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
