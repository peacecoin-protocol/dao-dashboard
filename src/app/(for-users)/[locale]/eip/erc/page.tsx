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
            <h1 className="post-title">ERC</h1>
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
                  <a href="/EIPS/eip-137">137</a>
                </td>

                <td className="title">
                  Ethereum Domain Name Service - Specification
                </td>
                <td className="author">
                  Nick Johnson&nbsp;&lt;
                  <a href="mailto:arachnid@notdot.net">arachnid@notdot.net</a>
                  &gt;
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
                  <a href="mailto:chris@ethereum.org">chris@ethereum.org</a>
                  &gt;, Nick Johnson&nbsp;&lt;
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
                  <a href="mailto:github.com@phor.net">github.com@phor.net</a>
                  &gt;
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-173">173</a>
                </td>

                <td className="title">Contract Ownership Standard</td>
                <td className="author">
                  Nick Mudge&nbsp;(
                  <a href="https://github.com/mudgen">@mudgen</a>), Dan
                  Finlay&nbsp;&lt;
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
                  <a href="mailto:arachnid@notdot.net">arachnid@notdot.net</a>
                  &gt;
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
                  Catalano&nbsp;(
                  <a href="https://github.com/VoR0220">@VoR0220</a>), Iuri
                  Matias&nbsp;(
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
                  <a href="mailto:arachnid@notdot.net">arachnid@notdot.net</a>
                  &gt;
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
                  <a href="/EIPS/eip-721">721</a>
                </td>

                <td className="title">Non-Fungible Token Standard</td>
                <td className="author">
                  William Entriken&nbsp;(
                  <a href="https://github.com/fulldecent">@fulldecent</a>),
                  Dieter Shirley&nbsp;&lt;
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
                  <a href="/EIPS/eip-820">820</a>
                </td>

                <td className="title">
                  Pseudo-introspection Registry Contract
                </td>
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
                  <a href="/EIPS/eip-1046">1046</a>
                </td>

                <td className="title">tokenURI Interoperability</td>
                <td className="author">
                  Tommy Nicholas&nbsp;(
                  <a href="https://github.com/tomasienrbc">@tomasienrbc</a>),
                  Matt Russo&nbsp;(
                  <a href="https://github.com/mateosu">@mateosu</a>), John
                  Zettler&nbsp;(
                  <a href="https://github.com/JohnZettler">@JohnZettler</a>),
                  Matt Condon&nbsp;(
                  <a href="https://github.com/shrugs">@shrugs</a>), Gavin
                  John&nbsp;(
                  <a href="https://github.com/Pandapip1">@Pandapip1</a>)
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
                  <a href="mailto:ac0dem0nk3y@gmail.com">
                    ac0dem0nk3y@gmail.com
                  </a>
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
                  <a href="https://github.com/yarrumretep">@yarrumretep</a>),
                  Nate Welch&nbsp;(
                  <a href="https://github.com/flygoing">@flygoing</a>), Joe
                  Messerman&nbsp;(
                  <a href="https://github.com/JAMesserman">@JAMesserman</a>)
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
                  <a href="https://github.com/abandeali1">@abandeali1</a>),
                  Jorge Izquierdo&nbsp;(
                  <a href="https://github.com/izqui">@izqui</a>), Bertrand
                  Masius&nbsp;(
                  <a href="https://github.com/catageek">@catageek</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1328">1328</a>
                </td>

                <td className="title">WalletConnect URI Format</td>
                <td className="author">
                  ligi&nbsp;(<a href="https://github.com/ligi">@ligi</a>), Pedro
                  Gomes&nbsp;(
                  <a href="https://github.com/pedrouid">@pedrouid</a>)
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
                  <a href="/EIPS/eip-1820">1820</a>
                </td>

                <td className="title">
                  Pseudo-introspection Registry Contract
                </td>
                <td className="author">
                  Jordi Baylina&nbsp;&lt;
                  <a href="mailto:jordi@baylina.cat">jordi@baylina.cat</a>&gt;,
                  Jacques Dafflon&nbsp;&lt;
                  <a href="mailto:mail@0xjac.com">mail@0xjac.com</a>&gt;
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
                  <a href="/EIPS/eip-2309">2309</a>
                </td>

                <td className="title">
                  ERC-721 Consecutive Transfer Extension
                </td>
                <td className="author">
                  Sean Papanikolas&nbsp;(
                  <a href="https://github.com/pizzarob">@pizzarob</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2535">2535</a>
                </td>

                <td className="title">Diamonds, Multi-Facet Proxy</td>
                <td className="author">
                  Nick Mudge&nbsp;(
                  <a href="https://github.com/mudgen">@mudgen</a>)
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
                  <a href="/EIPS/eip-2771">2771</a>
                </td>

                <td className="title">
                  Secure Protocol for Native Meta Transactions
                </td>
                <td className="author">
                  Ronan Sandford&nbsp;(
                  <a href="https://github.com/wighawag">@wighawag</a>), Liraz
                  Siri&nbsp;(
                  <a href="https://github.com/lirazsiri">@lirazsiri</a>), Dror
                  Tirosh&nbsp;(
                  <a href="https://github.com/drortirosh">@drortirosh</a>), Yoav
                  Weiss&nbsp;(<a href="https://github.com/yoavw">@yoavw</a>),
                  Alex Forshtat&nbsp;(
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
                  John&nbsp;(
                  <a href="https://github.com/Pandapip1">@Pandapip1</a>)
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
                  Seibel&nbsp;(<a href="https://github.com/seibelj">@seibelj</a>
                  )
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
                  <a href="https://github.com/fifikobayashi">@fifikobayashi</a>
                  ), fubuloubu&nbsp;(
                  <a href="https://github.com/fubuloubu">@fubuloubu</a>), Austin
                  Williams&nbsp;(
                  <a href="https://github.com/onewayfunction">
                    @onewayfunction
                  </a>
                  )
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
                  Ngakam&nbsp;(<a href="https://github.com/drikssy">@drikssy</a>
                  ), Dhruv Malik&nbsp;(
                  <a href="https://github.com/dhruvmalik007">@dhruvmalik007</a>
                  ), Samuel Gwlanold Edoumou&nbsp;(
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
                  <a href="mailto:myan@solv.finance">myan@solv.finance</a>&gt;,
                  Yi Cai (@YeeTsai)&nbsp;&lt;
                  <a href="mailto:yee.tsai@gmail.com">yee.tsai@gmail.com</a>
                  &gt;, Ryan Chow&nbsp;&lt;
                  <a href="mailto:ryanchow@solv.finance">
                    ryanchow@solv.finance
                  </a>
                  &gt;, Zhongxin Wu&nbsp;(
                  <a href="https://github.com/Nerverwind">@Nerverwind</a>),
                  AlvisDu&nbsp;(
                  <a href="https://github.com/AlvisDu">@AlvisDu</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3643">3643</a>
                </td>

                <td className="title">T-REX - Token for Regulated EXchanges</td>
                <td className="author">
                  Joachim Lebrun&nbsp;(
                  <a href="https://github.com/Joachim-Lebrun">
                    @Joachim-Lebrun
                  </a>
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
                  <a href="https://github.com/RosarioArjona">@RosarioArjona</a>
                  ), Roberto Román&nbsp;&lt;
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
                  <a href="https://github.com/JetJadeja">@JetJadeja</a>),
                  Alberto Cuesta Cañada&nbsp;(
                  <a href="https://github.com/alcueca">@alcueca</a>), Señor
                  Doggo&nbsp;(
                  <a href="https://github.com/fubuloubu">@fubuloubu</a>)
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
                  Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>
                  ), Chao Pi&nbsp;(
                  <a href="https://github.com/pichaoqkc">@pichaoqkc</a>), Sam
                  Wilson&nbsp;(
                  <a href="https://github.com/SamWilsn">@SamWilsn</a>)
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
                  <a href="/EIPS/eip-4906">4906</a>
                </td>

                <td className="title">EIP-721 Metadata Update Extension</td>
                <td className="author">
                  Anders&nbsp;(
                  <a href="https://github.com/0xanders">@0xanders</a>),
                  Lance&nbsp;(
                  <a href="https://github.com/LanceSnow">@LanceSnow</a>),
                  Shrug&nbsp;&lt;
                  <a href="mailto:shrug@emojidao.org">shrug@emojidao.org</a>
                  &gt;, Nathan&nbsp;&lt;
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
                  Anders&nbsp;(
                  <a href="https://github.com/0xanders">@0xanders</a>),
                  Lance&nbsp;(
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
                  Anders&nbsp;(
                  <a href="https://github.com/0xanders">@0xanders</a>),
                  Shrug&nbsp;&lt;
                  <a href="mailto:shrug@emojidao.org">shrug@emojidao.org</a>&gt;
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-5007">5007</a>
                </td>

                <td className="title">Time NFT, ERC-721 Time Extension</td>
                <td className="author">
                  Anders&nbsp;(
                  <a href="https://github.com/0xanders">@0xanders</a>),
                  Lance&nbsp;(
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
                  <a href="/EIPS/eip-5169">5169</a>
                </td>

                <td className="title">Client Script URI for Token Contracts</td>
                <td className="author">
                  James&nbsp;(
                  <a href="https://github.com/JamesSmartCell">
                    @JamesSmartCell
                  </a>
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
                  Anders&nbsp;(
                  <a href="https://github.com/0xanders">@0xanders</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-5202">5202</a>
                </td>

                <td className="title">Blueprint contract format</td>
                <td className="author">
                  Charles Cooper&nbsp;(
                  <a href="https://github.com/charles-cooper">
                    @charles-cooper
                  </a>
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
                  Buzz Cai&nbsp;(
                  <a href="https://github.com/buzzcai">@buzzcai</a>)
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
                  elie222&nbsp;(
                  <a href="https://github.com/elie222">@elie222</a>), Gavin
                  John&nbsp;(
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
                  Solomon&nbsp;(<a href="https://github.com/mds1">@mds1</a>),
                  Ben DiFrancesco&nbsp;(
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
                  <a href="https://github.com/ngveega">@ngveega</a>),
                  Tiger&nbsp;(<a href="https://github.com/tiger0x">@tiger0x</a>
                  ), Fred&nbsp;(
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
                  <a href="https://github.com/DeFiFoFum">@DeFiFoFum</a>),
                  Elliott Green&nbsp;(
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
                  Stam&nbsp;(<a href="https://github.com/mattstam">@mattstam</a>
                  )
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
                  <a href="/EIPS/eip-5773">5773</a>
                </td>

                <td className="title">Context-Dependent Multi-Asset Tokens</td>
                <td className="author">
                  Bruno Škvorc&nbsp;(
                  <a href="https://github.com/Swader">@Swader</a>),
                  Cicada&nbsp;(
                  <a href="https://github.com/CicadaNCR">@CicadaNCR</a>), Steven
                  Pineda&nbsp;(
                  <a href="https://github.com/steven2308">@steven2308</a>),
                  Stevan Bogosavljevic&nbsp;(
                  <a href="https://github.com/stevyhacker">@stevyhacker</a>),
                  Jan Turk&nbsp;(
                  <a href="https://github.com/ThunderDeliverer">
                    @ThunderDeliverer
                  </a>
                  )
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
                  <a href="https://github.com/Swader">@Swader</a>),
                  Cicada&nbsp;(
                  <a href="https://github.com/CicadaNCR">@CicadaNCR</a>), Steven
                  Pineda&nbsp;(
                  <a href="https://github.com/steven2308">@steven2308</a>),
                  Stevan Bogosavljevic&nbsp;(
                  <a href="https://github.com/stevyhacker">@stevyhacker</a>),
                  Jan Turk&nbsp;(
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
                  <a href="mailto:kartin@hyperoracle.io">
                    kartin@hyperoracle.io
                  </a>
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
                  <a href="https://github.com/Swader">@Swader</a>),
                  Cicada&nbsp;(
                  <a href="https://github.com/CicadaNCR">@CicadaNCR</a>), Steven
                  Pineda&nbsp;(
                  <a href="https://github.com/steven2308">@steven2308</a>),
                  Stevan Bogosavljevic&nbsp;(
                  <a href="https://github.com/stevyhacker">@stevyhacker</a>),
                  Jan Turk&nbsp;(
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
                  <a href="https://github.com/steven2308">@steven2308</a>),
                  Stevan Bogosavljevic&nbsp;(
                  <a href="https://github.com/stevyhacker">@stevyhacker</a>),
                  Jan Turk&nbsp;(
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
                  <a href="https://github.com/steven2308">@steven2308</a>),
                  Stevan Bogosavljevic&nbsp;(
                  <a href="https://github.com/stevyhacker">@stevyhacker</a>),
                  Jan Turk&nbsp;(
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
                  Matt Solomon&nbsp;(<a href="https://github.com/mds1">@mds1</a>
                  ), Toni Wahrstätter&nbsp;(
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
                  <a href="mailto:randy@redreamer.io">randy@redreamer.io</a>
                  &gt;, Boyu Chu (@chuboyu)&nbsp;&lt;
                  <a href="mailto:boyu@redreamer.io">boyu@redreamer.io</a>&gt;,
                  Boxi Li (@boxi79)&nbsp;&lt;
                  <a href="mailto:boxi@redreamer.io">boxi@redreamer.io</a>&gt;,
                  Jason Cheng (@JasonCheng0729)&nbsp;&lt;
                  <a href="mailto:jason@redreamer.io">jason@redreamer.io</a>&gt;
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
                  Zeman&nbsp;(<a href="https://github.com/NickZCZ">@NickZCZ</a>
                  ), Narcis Cotaie&nbsp;(
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
                  Zeman&nbsp;(<a href="https://github.com/NickZCZ">@NickZCZ</a>
                  ), Narcis Cotaie&nbsp;(
                  <a href="https://github.com/NarcisCRO">@NarcisCRO</a>)
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
                  Spataru&nbsp;(
                  <a href="https://github.com/urataps">@urataps</a>)
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
                  <a href="https://github.com/streamnft-tech">
                    @streamnft-tech
                  </a>
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
                  <a href="/EIPS/eip-7401">7401</a>
                </td>

                <td className="title">
                  Parent-Governed Non-Fungible Tokens Nesting
                </td>
                <td className="author">
                  Bruno Škvorc&nbsp;(
                  <a href="https://github.com/Swader">@Swader</a>),
                  Cicada&nbsp;(
                  <a href="https://github.com/CicadaNCR">@CicadaNCR</a>), Steven
                  Pineda&nbsp;(
                  <a href="https://github.com/steven2308">@steven2308</a>),
                  Stevan Bogosavljevic&nbsp;(
                  <a href="https://github.com/stevyhacker">@stevyhacker</a>),
                  Jan Turk&nbsp;(
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
                  <a href="https://github.com/steven2308">@steven2308</a>),
                  Stevan Bogosavljevic&nbsp;(
                  <a href="https://github.com/stevyhacker">@stevyhacker</a>),
                  Jan Turk&nbsp;(
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
                  <a href="mailto:service@getoken.io">service@getoken.io</a>
                  &gt;, Sandy Sung&nbsp;(
                  <a href="https://github.com/sandy-sung-lb">@sandy-sung-lb</a>
                  ), Mars Peng&nbsp;&lt;
                  <a href="mailto:mars.peng@getoken.io">mars.peng@getoken.io</a>
                  &gt;, Taien Wang&nbsp;&lt;
                  <a href="mailto:taien.wang@getoken.io">
                    taien.wang@getoken.io
                  </a>
                  &gt;
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

                <td className="title">
                  Asynchronous ERC-4626 Tokenized Vaults
                </td>
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
                  Juliano Rizzo&nbsp;(
                  <a href="https://github.com/juli">@juli</a>)
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
                  <a href="/EIPS/eip-5008">5008</a>
                </td>

                <td className="date">2023-08-15</td>

                <td className="title">ERC-721 Nonce Extension</td>
                <td className="author">
                  Anders&nbsp;(
                  <a href="https://github.com/0xanders">@0xanders</a>),
                  Lance&nbsp;(
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
                  <a href="https://github.com/PierrickGT">@PierrickGT</a>),
                  Chris Whinfrey&nbsp;(
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
                  <a href="https://github.com/ivanmmurciaua">@ivanmmurciaua</a>
                  ), Juan Carlos Cantó&nbsp;(
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

                <td className="title">
                  Endorsement - Permit for Any Functions
                </td>
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
                  <a href="/EIPS/eip-6093">6093</a>
                </td>

                <td className="date">2023-08-15</td>

                <td className="title">
                  Custom errors for commonly-used tokens
                </td>
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
                  <a href="/EIPS/eip-1185">1185</a>
                </td>

                <td className="title">Storage of DNS Records in ENS</td>
                <td className="author">
                  Jim McDonald&nbsp;(
                  <a href="https://github.com/mcdee">@mcdee</a>)
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
                  <a href="/EIPS/eip-5568">5568</a>
                </td>

                <td className="title">
                  Well-Known Format for Required Actions
                </td>
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
                  foobar&nbsp;(
                  <a href="https://github.com/0xfoobar">@0xfoobar</a>), Wilkins
                  Chung (@wwhchung)&nbsp;&lt;
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
                  <a href="https://github.com/Alex-Klasma">@Alex-Klasma</a>),
                  Ben Fusek&nbsp;(
                  <a href="https://github.com/bfusek">@bfusek</a>), Daniel
                  Fallon-Cyr&nbsp;(
                  <a href="https://github.com/dfalloncyr">@dfalloncyr</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-6120">6120</a>
                </td>

                <td className="title">Universal Token Router</td>
                <td className="author">
                  Derivable&nbsp;(
                  <a href="https://github.com/derivable-labs">
                    @derivable-labs
                  </a>
                  ), Zergity&nbsp;(
                  <a href="https://github.com/Zergity">@Zergity</a>), Ngo Quang
                  Anh&nbsp;(<a href="https://github.com/anhnq82">@anhnq82</a>),
                  BerlinP&nbsp;(
                  <a href="https://github.com/BerlinP">@BerlinP</a>), Khanh
                  Pham&nbsp;(
                  <a href="https://github.com/blackskin18">@blackskin18</a>),
                  Hal Blackburn&nbsp;(<a href="https://github.com/h4l">@h4l</a>)
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

                <td className="title">
                  ERC-2771 Namespaced Account Abstraction
                </td>
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
                  <a href="mailto:chengjingxx@gmail.com">
                    chengjingxx@gmail.com
                  </a>
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
                  <a href="https://github.com/chiro-hiro">@chiro-hiro</a>),
                  Victor Dusart&nbsp;(
                  <a href="https://github.com/vdusart">@vdusart</a>)
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
                  Giordano&nbsp;(
                  <a href="https://github.com/frangio">@frangio</a>)
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
                  <a href="mailto:jhweintraub@gmail.com">
                    jhweintraub@gmail.com
                  </a>
                  &gt;, Rob Montgomery (@RobAnon)&nbsp;&lt;
                  <a href="mailto:rob@revest.finance">rob@revest.finance</a>
                  &gt;, vectorized&nbsp;(
                  <a href="https://github.com/vectorized">@vectorized</a>),
                  Víctor Martínez&nbsp;(
                  <a href="https://github.com/vnmrtz">@vnmrtz</a>), Adrián
                  Pajares&nbsp;(
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
                  <a href="mailto:gary@artifactlabs.com">
                    gary@artifactlabs.com
                  </a>
                  &gt;, Henry Chan&nbsp;&lt;
                  <a href="mailto:henry@artifactlabs.com">
                    henry@artifactlabs.com
                  </a>
                  &gt;, Joey Liu&nbsp;&lt;
                  <a href="mailto:joey@artifactlabs.com">
                    joey@artifactlabs.com
                  </a>
                  &gt;, Lauren Ho&nbsp;&lt;
                  <a href="mailto:lauren@artifactlabs.com">
                    lauren@artifactlabs.com
                  </a>
                  &gt;, Jeff Leung&nbsp;&lt;
                  <a href="mailto:jeff@artifactlabs.com">
                    jeff@artifactlabs.com
                  </a>
                  &gt;, Brian Liang&nbsp;&lt;
                  <a href="mailto:brian@artifactlabs.com">
                    brian@artifactlabs.com
                  </a>
                  &gt;, Joyce Li&nbsp;&lt;
                  <a href="mailto:joyce@artifactlabs.com">
                    joyce@artifactlabs.com
                  </a>
                  &gt;, Avir Mahtani&nbsp;&lt;
                  <a href="mailto:avir@artifactlabs.com">
                    avir@artifactlabs.com
                  </a>
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
                  <a href="https://github.com/chiro-hiro">@chiro-hiro</a>),
                  Victor Dusart&nbsp;(
                  <a href="https://github.com/vdusart">@vdusart</a>)
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
                  <a href="/EIPS/eip-7007">7007</a>
                </td>

                <td className="title">Verifiable AI-Generated Content Token</td>
                <td className="author">
                  Cathie So&nbsp;(
                  <a href="https://github.com/socathie">@socathie</a>), Xiaohang
                  Yu&nbsp;(
                  <a href="https://github.com/xhyumiracle">@xhyumiracle</a>),
                  Conway&nbsp;(<a href="https://github.com/0x1cc">@0x1cc</a>),
                  Lee Ting Ting&nbsp;(
                  <a href="https://github.com/tina1998612">@tina1998612</a>),
                  Kartin&nbsp;&lt;
                  <a href="mailto:kartin@hyperoracle.io">
                    kartin@hyperoracle.io
                  </a>
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
                  <a href="/EIPS/eip-7432">7432</a>
                </td>

                <td className="title">Non-Fungible Token Roles</td>
                <td className="author">
                  Ernani São Thiago&nbsp;(
                  <a href="https://github.com/ernanirst">@ernanirst</a>), Daniel
                  Lima&nbsp;(<a href="https://github.com/karacurt">@karacurt</a>
                  )
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
                  <a href="/EIPS/eip-7578">7578</a>
                </td>

                <td className="title">Physical Asset Redemption</td>
                <td className="author">
                  Lee Vidor&nbsp;(<a href="https://github.com/V1d0r">@V1d0r</a>
                  ), David Tan&nbsp;&lt;
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

                <td className="title">
                  Blob Transactions Metadata JSON Schema
                </td>
                <td className="author">
                  Gavin Fu&nbsp;(<a href="https://github.com/gavfu">@gavfu</a>),
                  Leo Wang&nbsp;(
                  <a href="https://github.com/wanglie1986">@wanglie1986</a>),
                  Bova Chen&nbsp;(
                  <a href="https://github.com/appoipp">@appoipp</a>), Aiden
                  X&nbsp;(<a href="https://github.com/4ever9">@4ever9</a>)
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
                  Evan&nbsp;(<a href="https://github.com/evbots">@evbots</a>),
                  Yin Xu&nbsp;(
                  <a href="https://github.com/yingogobot">@yingogobot</a>)
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
                  Weiss&nbsp;(<a href="https://github.com/yoavw">@yoavw</a>),
                  Dror Tirosh&nbsp;(
                  <a href="https://github.com/drortirosh">@drortirosh</a>),
                  Shahaf Nacson&nbsp;(
                  <a href="https://github.com/shahafn">@shahafn</a>), Alex
                  Forshtat&nbsp;(
                  <a href="https://github.com/forshtat">@forshtat</a>), Kristof
                  Gazso&nbsp;(
                  <a href="https://github.com/kristofgazso">@kristofgazso</a>),
                  Tjaden Hess&nbsp;(
                  <a href="https://github.com/tjade273">@tjade273</a>)
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
                  <a href="https://github.com/AlexPartyPanda">
                    @AlexPartyPanda
                  </a>
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
                  PhD&nbsp;&lt;<a href="mailto:david@iob.fi">david@iob.fi</a>
                  &gt;
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
                  <a href="https://github.com/agusx1211">@agusx1211</a>),
                  Philippe Castonguay&nbsp;(
                  <a href="https://github.com/phabc">@phabc</a>), Michael
                  Standen&nbsp;(
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
                  Oliver Terbu&nbsp;(
                  <a href="https://github.com/awoie">@awoie</a>), Jacob
                  Ward&nbsp;(<a href="https://github.com/cobward">@cobward</a>),
                  Charles Lehner&nbsp;(
                  <a href="https://github.com/clehner">@clehner</a>), Sam
                  Gbafa&nbsp;(<a href="https://github.com/skgbafa">@skgbafa</a>
                  ), Wayne Chang&nbsp;(<a href="https://github.com/wyc">@wyc</a>
                  ), Charles Cunningham&nbsp;(
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
                  <a href="mailto:allen@ubiloan.io">allen@ubiloan.io</a>&gt;,
                  Alex Qin&nbsp;&lt;
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
                  2pmflow&nbsp;(
                  <a href="https://github.com/2pmflow">@2pmflow</a>),
                  locationtba&nbsp;(
                  <a href="https://github.com/locationtba">@locationtba</a>),
                  Cameron Robertson&nbsp;(
                  <a href="https://github.com/ccamrobertson">@ccamrobertson</a>
                  ), cygaar&nbsp;(
                  <a href="https://github.com/cygaar">@cygaar</a>), Brian
                  Weick&nbsp;(<a href="https://github.com/bweick">@bweick</a>)
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
                  Korpis&nbsp;(
                  <a href="https://github.com/kourouta">@kourouta</a>)
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
                  <a href="mailto:martinetlee@gmail.com">
                    martinetlee@gmail.com
                  </a>
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

                <td className="title">
                  AA Account Metadata For Authentication
                </td>
                <td className="author">
                  Shu Dong&nbsp;(
                  <a href="https://github.com/dongshu2013">@dongshu2013</a>),
                  Zihao Chen&nbsp;(
                  <a href="https://github.com/zihaoccc">@zihaoccc</a>), Peter
                  Chen&nbsp;(
                  <a href="https://github.com/pette1999">@pette1999</a>)
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
                  <a href="/EIPS/eip-6734">6734</a>
                </td>

                <td className="title">L2 Token List</td>
                <td className="author">
                  Kelvin Fichter&nbsp;(
                  <a href="https://github.com/smartcontracts">
                    @smartcontracts
                  </a>
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
                  <a href="https://github.com/smartcontracts">
                    @smartcontracts
                  </a>
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

                <td className="title">
                  ERC-721 Utilities Information Extension
                </td>
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

                <td className="title">
                  Registry for royalties payment for NFTs
                </td>
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
                  Roy&nbsp;(<a href="https://github.com/royshang">@royshang</a>
                  ), Jun&nbsp;(
                  <a href="https://github.com/SniperUsopp">@SniperUsopp</a>)
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
                  Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>
                  ), Qiang Zhu&nbsp;(
                  <a href="https://github.com/qzhodl">@qzhodl</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-6823">6823</a>
                </td>

                <td className="title">
                  Token Mapping Slot Retrieval Extension
                </td>
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
                  Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>
                  ), Chao Pi&nbsp;(
                  <a href="https://github.com/pichaoqkc">@pichaoqkc</a>), Sam
                  Wilson&nbsp;(
                  <a href="https://github.com/SamWilsn">@SamWilsn</a>), Nicolas
                  Deschildre&nbsp;(<a href="https://github.com/nand2">@nand2</a>
                  )
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
                  <a href="https://github.com/adamegyed">@adamegyed</a>),
                  Fangting Liu&nbsp;(
                  <a href="https://github.com/trinity-0111">@trinity-0111</a>),
                  Jay Paik&nbsp;(
                  <a href="https://github.com/jaypaik">@jaypaik</a>), Yoav
                  Weiss&nbsp;(<a href="https://github.com/yoavw">@yoavw</a>),
                  Huawei Gu&nbsp;(
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
                  <a href="https://github.com/mohamadhammoud">
                    @mohamadhammoud
                  </a>
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
                  <a href="mailto:kartik@manifold.xyz">kartik@manifold.xyz</a>
                  &gt;
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
                  Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>
                  ), Nicolas Deschildre&nbsp;(
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
                  Xiang&nbsp;(<a href="https://github.com/xcshuan">@xcshuan</a>
                  ), Kyle Xu&nbsp;(
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
                  Ben77&nbsp;(<a href="https://github.com/ben2077">@ben2077</a>
                  ), Mingshi S.&nbsp;(
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
                  Ben77&nbsp;(<a href="https://github.com/ben2077">@ben2077</a>
                  ), Mingshi S.&nbsp;(
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
                  Rubin&nbsp;(<a href="https://github.com/pash7ka">@pash7ka</a>
                  ), Sebastian Galimberti Romano&nbsp;(
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
                  <a href="https://github.com/quyphandang">@quyphandang</a>),
                  Quy Phan&nbsp;&lt;
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
                  <a href="https://github.com/AmadiMichaels">@AmadiMichaels</a>
                  ), Devtooligan&nbsp;(
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
                  <a href="https://github.com/mohamadhammoud">
                    @mohamadhammoud
                  </a>
                  )
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
                  db&nbsp;(<a href="https://github.com/dbeal-eth">@dbeal-eth</a>
                  )
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
                  <a href="https://github.com/montasaurus">@montasaurus</a>),
                  Ryan Ghods&nbsp;(
                  <a href="https://github.com/ryanio">@ryanio</a>), 0age&nbsp;(
                  <a href="https://github.com/0age">@0age</a>), James
                  Wenzel&nbsp;(<a href="https://github.com/emo-eth">@emo-eth</a>
                  ), Stephan Min&nbsp;(
                  <a href="https://github.com/stephankmin">@stephankmin</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-7498">7498</a>
                </td>

                <td className="title">NFT Redeemables</td>
                <td className="author">
                  Ryan Ghods&nbsp;(
                  <a href="https://github.com/ryanio">@ryanio</a>), 0age&nbsp;(
                  <a href="https://github.com/0age">@0age</a>), Adam
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
                  <a href="https://github.com/strumswell">@strumswell</a>),
                  Dennis von der Bey&nbsp;(
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
                  Ming Jiang&nbsp;(
                  <a href="https://github.com/minkyn">@minkyn</a>), Zheng
                  Han&nbsp;(<a href="https://github.com/hanbsd">@hanbsd</a>),
                  Fan Yang&nbsp;(<a href="https://github.com/fayang">@fayang</a>
                  )
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
                  Ming Jiang&nbsp;(
                  <a href="https://github.com/minkyn">@minkyn</a>), Zheng
                  Han&nbsp;(<a href="https://github.com/hanbsd">@hanbsd</a>),
                  Fan Yang&nbsp;(<a href="https://github.com/fayang">@fayang</a>
                  )
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
                  <a href="https://github.com/cylon56">@cylon56</a>), Shay Zluf
                  - Hats Finance&nbsp;(
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
                  <a href="mailto:tsngmj@gmail.com">tsngmj@gmail.com</a>&gt;,
                  Clay (@Clay2018)&nbsp;&lt;
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
                  <a href="mailto:abhinav@zoniqx.com">abhinav@zoniqx.com</a>
                  &gt;, Prithvish Baidya (@d4mr)&nbsp;&lt;
                  <a href="mailto:pbaidya@zoniqx.com">pbaidya@zoniqx.com</a>
                  &gt;, Rajat Kumar (@rajatwasan)&nbsp;&lt;
                  <a href="mailto:rwasan@zoniqx.com">rwasan@zoniqx.com</a>&gt;,
                  Prasanth Kalangi&nbsp;&lt;
                  <a href="mailto:pkalangi@zoniqx.com">pkalangi@zoniqx.com</a>
                  &gt;
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
                  <a href="https://github.com/pixelcircuits">@pixelcircuits</a>
                  ), Bikem Bengisu&nbsp;(
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
                  <a href="mailto:dean@dauth.network">dean@dauth.network</a>
                  &gt;, Song Z&nbsp;&lt;
                  <a href="mailto:s@misfit.id">s@misfit.id</a>&gt;, Kai
                  Chen&nbsp;&lt;
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
                  Gurkan&nbsp;(
                  <a href="https://github.com/kobigurk">@kobigurk</a>), Richard
                  Liu&nbsp;(<a href="https://github.com/rrrliu">@rrrliu</a>),
                  Vivek Bhupatiraju&nbsp;(
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
                  <a href="mailto:lz8aj@virginia.edu">lz8aj@virginia.edu</a>
                  &gt;, Jerry&nbsp;&lt;
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
                  Zisu&nbsp;(<a href="https://github.com/lazy1523">@lazy1523</a>
                  )
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
                  <a href="/EIPS/eip-7546">7546</a>
                </td>

                <td className="title">
                  Upgradeable Clone for Scalable Contracts
                </td>
                <td className="author">
                  Shogo Ochiai (@shogochiai)&nbsp;&lt;
                  <a href="mailto:shogo.ochiai@pm.me">shogo.ochiai@pm.me</a>
                  &gt;, Kai Hiroi (@KaiHiroi)&nbsp;&lt;
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
                  CT29&nbsp;&lt;
                  <a href="mailto:CT29@1combo.io">CT29@1combo.io</a>&gt;,
                  Luigi&nbsp;&lt;
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
                  Gutlic&nbsp;(
                  <a href="https://github.com/morrigan">@morrigan</a>), Marin
                  Petrunić&nbsp;(
                  <a href="https://github.com/mpetrunic">@mpetrunic</a>), Pedro
                  Gomes&nbsp;(
                  <a href="https://github.com/pedrouid">@pedrouid</a>)
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
                  Ben77&nbsp;(<a href="https://github.com/ben2077">@ben2077</a>
                  ), Mingshi S.&nbsp;(
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
                  Yoav Weiss&nbsp;(<a href="https://github.com/yoavw">@yoavw</a>
                  ), Dror Tirosh&nbsp;(
                  <a href="https://github.com/drortirosh">@drortirosh</a>), Alex
                  Forshtat&nbsp;(
                  <a href="https://github.com/forshtat">@forshtat</a>), Shahaf
                  Nacson&nbsp;(<a href="https://github.com/shahafn">@shahafn</a>
                  )
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
                  Ben77&nbsp;(<a href="https://github.com/ben2077">@ben2077</a>
                  ), Mingshi S.&nbsp;(
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
                  <a href="mailto:hyougnsung@keti.re.kr">
                    hyougnsung@keti.re.kr
                  </a>
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
                  <a href="/EIPS/eip-7579">7579</a>
                </td>

                <td className="title">Minimal Modular Smart Accounts</td>
                <td className="author">
                  zeroknots&nbsp;(
                  <a href="https://github.com/zeroknots">@zeroknots</a>), Konrad
                  Kopp&nbsp;(<a href="https://github.com/kopy-kat">@kopy-kat</a>
                  ), Taek Lee&nbsp;(
                  <a href="https://github.com/leekt">@leekt</a>), Fil
                  Makarov&nbsp;(
                  <a href="https://github.com/filmakarov">@filmakarov</a>), Elim
                  Poon&nbsp;(<a href="https://github.com/yaonam">@yaonam</a>),
                  Lyu Min&nbsp;(
                  <a href="https://github.com/rockmin216">@rockmin216</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-7580">7580</a>
                </td>

                <td className="title">Advertisement Tracking Interface</td>
                <td className="author">
                  wart&nbsp;(
                  <a href="https://github.com/wartstone">@wartstone</a>)
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

                <td className="title">
                  MixHash and Public Data Storage Proofs
                </td>
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
                  Lima&nbsp;(<a href="https://github.com/karacurt">@karacurt</a>
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
                  <a href="/EIPS/eip-7615">7615</a>
                </td>

                <td className="title">
                  Atomic Push-based Data Feed Among Contracts
                </td>
                <td className="author">
                  Elaine Zhang (@lanyinzly)&nbsp;&lt;
                  <a href="mailto:lz8aj@virginia.edu">lz8aj@virginia.edu</a>
                  &gt;, Jerry&nbsp;&lt;
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
                  Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>
                  ), Nicolas Deschildre&nbsp;(
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
                  Qi Zhou&nbsp;(<a href="https://github.com/qizhou">@qizhou</a>
                  ), Nicolas Deschildre&nbsp;(
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
                  <a href="mailto:dom@alvaraprotocol.io">
                    dom@alvaraprotocol.io
                  </a>
                  &gt;, Callum Mitchell-Clark (@AlvaraProtocol)&nbsp;&lt;
                  <a href="mailto:callum@alvaraprotocol.io">
                    callum@alvaraprotocol.io
                  </a>
                  &gt;, Joey van Etten&nbsp;&lt;
                  <a href="mailto:joe@alvaraprotocol.io">
                    joe@alvaraprotocol.io
                  </a>
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

                <td className="title">
                  ERC-20/ERC-721 Unified Token Interface
                </td>
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
                  Thomas&nbsp;(
                  <a href="https://github.com/0xth0mas">@0xth0mas</a>),
                  Quit&nbsp;(
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
                  Zisu&nbsp;(<a href="https://github.com/lazy1523">@lazy1523</a>
                  )
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
                  <a href="mailto:kartin@hyperoracle.io">
                    kartin@hyperoracle.io
                  </a>
                  &gt;
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
                  <a href="/EIPS/eip-7649">7649</a>
                </td>

                <td className="title">
                  Bonding curve-embedded liquidity for NFTs
                </td>
                <td className="author">
                  Arif Khan&nbsp;&lt;
                  <a href="mailto:arif@alethea.ai">arif@alethea.ai</a>&gt;,
                  Ahmad Matyana&nbsp;&lt;
                  <a href="mailto:ahmad@alethea.ai">ahmad@alethea.ai</a>&gt;,
                  Basil Gorin&nbsp;(
                  <a href="https://github.com/vgorin">@vgorin</a>), Vijay
                  Bhayani&nbsp;(
                  <a href="https://github.com/unblocktechie">@unblocktechie</a>)
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
                  <a href="/EIPS/eip-7673">7673</a>
                </td>

                <td className="title">
                  Distinguishable base256emoji Addresses
                </td>
                <td className="author">
                  William Morriss&nbsp;(
                  <a href="https://github.com/wjmelements">@wjmelements</a>)
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
                  <a href="https://github.com/drortirosh">@drortirosh</a>),
                  Wilson Cusack&nbsp;(
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
                  <a href="https://github.com/plusminushalf">@plusminushalf</a>
                  ), Fil Makarov&nbsp;(
                  <a href="https://github.com/filmakarov">@filmakarov</a>),
                  Kristof Gazso&nbsp;(
                  <a href="https://github.com/kristofgazso">@kristofgazso</a>),
                  Derek Rein&nbsp;(<a href="https://github.com/arein">@arein</a>
                  ), Tomas Rocchi&nbsp;(
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
                  <a href="/EIPS/eip-7700">7700</a>
                </td>

                <td className="title">Cross-chain Storage Router Protocol</td>
                <td className="author">
                  Avneet Singh&nbsp;(
                  <a href="https://github.com/sshmatrix">@sshmatrix</a>),
                  0xc0de4c0ffee&nbsp;(
                  <a href="https://github.com/0xc0de4c0ffee">@0xc0de4c0ffee</a>
                  ), Nick Johnson&nbsp;(
                  <a href="https://github.com/arachnid">@arachnid</a>), Makoto
                  Inoue&nbsp;(<a href="https://github.com/makoto">@makoto</a>)
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
                  <a href="/EIPS/eip-801">801</a>
                </td>

                <td className="title">Canary Standard</td>
                <td className="author">
                  ligi&nbsp;&lt;<a href="mailto:ligi@ligi.de">ligi@ligi.de</a>
                  &gt;
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-823">823</a>
                </td>

                <td className="title">Token Exchange Standard</td>
                <td className="author">
                  Kashish Khullar&nbsp;&lt;
                  <a href="mailto:kkhullar7@gmail.com">kkhullar7@gmail.com</a>
                  &gt;
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
                  <a href="mailto:bg2655@columbia.edu">bg2655@columbia.edu</a>
                  &gt;
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
                  <a href="/EIPS/eip-1062">1062</a>
                </td>

                <td className="title">
                  Formalize IPFS hash into ENS(Ethereum Name Service) resolver
                </td>
                <td className="author">
                  Phyrex Tsai&nbsp;&lt;
                  <a href="mailto:phyrex@portal.network">
                    phyrex@portal.network
                  </a>
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
                  <a href="mailto:nitika@govblocks.io">nitika@govblocks.io</a>
                  &gt;
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
                  <a href="/EIPS/eip-1203">1203</a>
                </td>

                <td className="title">
                  ERC-1203 Multi-Class Token Standard (ERC-20 Extension)
                </td>
                <td className="author">
                  Jeff Huang&nbsp;&lt;
                  <a href="mailto:jeffishjeff@gmail.com">
                    jeffishjeff@gmail.com
                  </a>
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
                  <a href="/EIPS/eip-1261">1261</a>
                </td>

                <td className="title">Membership Verification Token (MVT)</td>
                <td className="author">
                  Chaitanya Potti&nbsp;(
                  <a href="https://github.com/chaitanyapotti">
                    @chaitanyapotti
                  </a>
                  ), Partha Bhattacharya&nbsp;(
                  <a href="https://github.com/pb25193">@pb25193</a>)
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
                  <a href="mailto:piper@ethereum.org">piper@ethereum.org</a>
                  &gt;, Christopher Gewecke&nbsp;&lt;
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
                  <a href="mailto:scott@blockcrushr.com">
                    scott@blockcrushr.com
                  </a>
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
                  <a href="https://github.com/kosecki123">@kosecki123</a>),
                  ankit raj&nbsp;&lt;
                  <a href="mailto:tradeninja7@gmail.com">
                    tradeninja7@gmail.com
                  </a>
                  &gt;, John Griffin&nbsp;&lt;
                  <a href="mailto:john@atchai.com">john@atchai.com</a>&gt;,
                  Nathan Creswell&nbsp;&lt;
                  <a href="mailto:nathantr@gmail.com">nathantr@gmail.com</a>&gt;
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
                  <a href="https://github.com/chaitanyapotti">
                    @chaitanyapotti
                  </a>
                  ), Partha Bhattacharya&nbsp;(
                  <a href="https://github.com/pb25193">@pb25193</a>)
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

                <td className="title">
                  Localized Messaging with Signal-to-Text
                </td>
                <td className="author">
                  Brooklyn Zelenka&nbsp;(
                  <a href="https://github.com/expede">@expede</a>), Jennifer
                  Cooper&nbsp;(
                  <a href="https://github.com/jenncoop">@jenncoop</a>)
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
                  <a href="https://github.com/johnshiple">@johnshiple</a>),
                  Howard Marks&nbsp;&lt;
                  <a href="mailto:howard@startengine.com">
                    howard@startengine.com
                  </a>
                  &gt;, David Zhang&nbsp;&lt;
                  <a href="mailto:david@startengine.com">
                    david@startengine.com
                  </a>
                  &gt;
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
                  Svirsky&nbsp;&lt;
                  <a href="mailto:js@atlant.io">js@atlant.io</a>&gt;
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
                  <a href="mailto:cr025@bucknell.edu">cr025@bucknell.edu</a>
                  &gt;, Ruthia He&nbsp;&lt;
                  <a href="mailto:rujiahe@gmail.com">rujiahe@gmail.com</a>&gt;,
                  Yun Ma&nbsp;&lt;
                  <a href="mailto:mayun@pku.edu.cn">mayun@pku.edu.cn</a>&gt;,
                  Xuanzhe Liu&nbsp;&lt;
                  <a href="mailto:liuxuanzhe@pku.edu.cn">
                    liuxuanzhe@pku.edu.cn
                  </a>
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
                  <a href="/EIPS/eip-1577">1577</a>
                </td>

                <td className="title">contenthash field for ENS</td>
                <td className="author">
                  Dean Eigenmann&nbsp;&lt;
                  <a href="mailto:dean@ens.domains">dean@ens.domains</a>&gt;,
                  Nick Johnson&nbsp;&lt;
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
                  Alejo Salles&nbsp;(
                  <a href="https://github.com/fiiiu">@fiiiu</a>), Stephane
                  Gosselin&nbsp;(
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
                  Long&nbsp;&lt;
                  <a href="mailto:dan@artblx.com">dan@artblx.com</a>&gt;, Kiryl
                  Yermakou&nbsp;&lt;
                  <a href="mailto:kiryl@artblx.com">kiryl@artblx.com</a>&gt;,
                  Nate van der Ende&nbsp;&lt;
                  <a href="mailto:nate@artblx.com">nate@artblx.com</a>&gt;
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
                  <a href="mailto:ac0dem0nk3y@gmail.com">
                    ac0dem0nk3y@gmail.com
                  </a>
                  &gt;, James Therien&nbsp;&lt;
                  <a href="mailto:james@enjin.io">james@enjin.io</a>&gt;, Eric
                  Binet&nbsp;&lt;
                  <a href="mailto:eric@enjin.io">eric@enjin.io</a>&gt;
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
                  <a href="/EIPS/eip-1948">1948</a>
                </td>

                <td className="title">Non-fungible Data Token</td>
                <td className="author">
                  Johann Barbie&nbsp;(
                  <a href="https://github.com/johannbarbie">@johannbarbie</a>),
                  Ben Bollen&nbsp;&lt;
                  <a href="mailto:ben@ost.com">ben@ost.com</a>&gt;,
                  pinkiebell&nbsp;(
                  <a href="https://github.com/pinkiebell">@pinkiebell</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-1973">1973</a>
                </td>

                <td className="title">Scalable Rewards</td>
                <td className="author">
                  Lee Raj&nbsp;(<a href="https://github.com/lerajk">@lerajk</a>
                  ), Qin Jian&nbsp;(
                  <a href="https://github.com/qinjian">@qinjian</a>)
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
                  <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;,
                  Daniel Lehrner&nbsp;&lt;
                  <a href="mailto:daniel@io.builders">daniel@io.builders</a>&gt;
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
                  <a href="/EIPS/eip-2018">2018</a>
                </td>

                <td className="title">Clearable Token</td>
                <td className="author">
                  Julio Faura&nbsp;&lt;
                  <a href="mailto:julio@adhara.io">julio@adhara.io</a>&gt;,
                  Fernando Paris&nbsp;&lt;
                  <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;,
                  Daniel Lehrner&nbsp;&lt;
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
                  <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;,
                  Julio Faura&nbsp;&lt;
                  <a href="mailto:julio@adhara.io">julio@adhara.io</a>&gt;,
                  Daniel Lehrner&nbsp;&lt;
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
                  <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;,
                  Daniel Lehrner&nbsp;&lt;
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
                  <a href="mailto:fer@io.builders">fer@io.builders</a>&gt;,
                  Julio Faura&nbsp;&lt;
                  <a href="mailto:julio@adhara.io">julio@adhara.io</a>&gt;,
                  Daniel Lehrner&nbsp;&lt;
                  <a href="mailto:daniel@io.builders">daniel@io.builders</a>&gt;
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
                  <a href="/EIPS/eip-2494">2494</a>
                </td>

                <td className="title">Baby Jubjub Elliptic Curve</td>
                <td className="author">
                  Barry WhiteHat&nbsp;(
                  <a href="https://github.com/barryWhiteHat">@barryWhiteHat</a>
                  ), Marta Bellés&nbsp;(
                  <a href="https://github.com/bellesmarta">@bellesmarta</a>),
                  Jordi Baylina&nbsp;(
                  <a href="https://github.com/jbaylina">@jbaylina</a>)
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
                  <a href="/EIPS/eip-2569">2569</a>
                </td>

                <td className="title">
                  Saving and Displaying Image Onchain for Universal Tokens
                </td>
                <td className="author">
                  Hua Zhang&nbsp;(
                  <a href="https://github.com/dgczhh">@dgczhh</a>), Yuefei
                  Tan&nbsp;(<a href="https://github.com/whtyfhas">@whtyfhas</a>
                  ), Derek Zhou&nbsp;(
                  <a href="https://github.com/zhous">@zhous</a>), Ran
                  Xing&nbsp;(
                  <a href="https://github.com/lemontreeran">@lemontreeran</a>)
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
                  <a href="https://github.com/juanfranblanco">
                    @juanfranblanco
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-2767">2767</a>
                </td>

                <td className="title">Contract Ownership Governance</td>
                <td className="author">
                  Soham Zemse&nbsp;(
                  <a href="https://github.com/zemse">@zemse</a>), Nick
                  Mudge&nbsp;(<a href="https://github.com/mudgen">@mudgen</a>)
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
                  <a href="/EIPS/eip-2942">2942</a>
                </td>

                <td className="title">EthPM URI Specification</td>
                <td className="author">
                  Nick Gheorghita&nbsp;(
                  <a href="https://github.com/njgheorghita">@njgheorghita</a>),
                  Piper Merriam&nbsp;(
                  <a href="https://github.com/pipermerriam">@pipermerriam</a>),
                  g. nicholas d'andrea&nbsp;(
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
                  <a href="https://github.com/robertogorini">@robertogorini</a>
                  ), Manuel Olivi&nbsp;(
                  <a href="https://github.com/manvel79">@manvel79</a>)
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
                  Britz&nbsp;(
                  <a href="https://github.com/kbrizzle">@kbrizzle</a>), David
                  Knott&nbsp;(
                  <a href="https://github.com/DavidLKnott">@DavidLKnott</a>)
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
                  <a href="https://github.com/fifikobayashi">@fifikobayashi</a>
                  ), fubuloubu&nbsp;(
                  <a href="https://github.com/fubuloubu">@fubuloubu</a>), Austin
                  Williams&nbsp;(
                  <a href="https://github.com/onewayfunction">
                    @onewayfunction
                  </a>
                  )
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3386">3386</a>
                </td>

                <td className="title">
                  ERC-721 and ERC-1155 to ERC-20 Wrapper
                </td>
                <td className="author">
                  Calvin Koder&nbsp;(
                  <a href="https://github.com/ashrowz">@ashrowz</a>)
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
                  <a href="/EIPS/eip-3589">3589</a>
                </td>

                <td className="title">Assemble assets into NFTs</td>
                <td className="author">
                  Zhenyu Sun&nbsp;(
                  <a href="https://github.com/Ungigdu">@Ungigdu</a>), Xinqi
                  Yang&nbsp;(
                  <a href="https://github.com/xinqiyang">@xinqiyang</a>)
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
                  <a href="/EIPS/eip-3770">3770</a>
                </td>

                <td className="title">Chain-specific addresses</td>
                <td className="author">
                  Lukas Schor&nbsp;(
                  <a href="https://github.com/lukasschor">@lukasschor</a>),
                  Richard Meissner&nbsp;(
                  <a href="https://github.com/rmeissner">@rmeissner</a>), Pedro
                  Gomes&nbsp;(
                  <a href="https://github.com/pedrouid">@pedrouid</a>),
                  ligi&nbsp;&lt;<a href="mailto:ligi@ligi.de">ligi@ligi.de</a>
                  &gt;
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-3772">3772</a>
                </td>

                <td className="title">Compressed Integers</td>
                <td className="author">
                  Soham Zemse&nbsp;(
                  <a href="https://github.com/zemse">@zemse</a>)
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

                <td className="title">
                  Micropayments for NFTs and Multi Tokens
                </td>
                <td className="author">
                  Jules Lai&nbsp;(
                  <a href="https://github.com/julesl23">@julesl23</a>)
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
                  <a href="/EIPS/eip-4671">4671</a>
                </td>

                <td className="title">Non-Tradable Tokens Standard</td>
                <td className="author">
                  Omar Aflak&nbsp;(
                  <a href="https://github.com/omaraflak">@omaraflak</a>),
                  Pol-Malo Le Bris, Marvin Martin&nbsp;(
                  <a href="https://github.com/MarvinMartin24">
                    @MarvinMartin24
                  </a>
                  )
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
                  Omnus Sunmo&nbsp;(
                  <a href="https://github.com/omnus">@omnus</a>)
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

                <td className="title">
                  Filesystem-like Interface for Contracts
                </td>
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
                  Alex&nbsp;(<a href="https://github.com/gojazdev">@gojazdev</a>
                  ), John&nbsp;(
                  <a href="https://github.com/sfumato00">@sfumato00</a>)
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
                  Cry&nbsp;(
                  <a href="https://github.com/crydoteth">@crydoteth</a>),
                  Sillytuna&nbsp;(
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

                <td className="title">
                  Slippage Protection for Tokenized Vault
                </td>
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
                  <a href="/EIPS/eip-5501">5501</a>
                </td>

                <td className="title">
                  Rental &amp; Delegation NFT - EIP-721 Extension
                </td>
                <td className="author">
                  Jan Smrža&nbsp;(<a href="https://github.com/smrza">@smrza</a>
                  ), David Rábel&nbsp;(
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
                  <a href="https://github.com/cozyfinance">@cozyfinance</a>),
                  Tony Sheng&nbsp;(
                  <a href="https://github.com/tonysheng">@tonysheng</a>), Matt
                  Solomon&nbsp;(<a href="https://github.com/mds1">@mds1</a>),
                  David Laprade&nbsp;(
                  <a href="https://github.com/davidlaprade">@davidlaprade</a>),
                  Payom Dousti&nbsp;(
                  <a href="https://github.com/payomdousti">@payomdousti</a>),
                  Chad Fleming&nbsp;(
                  <a href="https://github.com/chad-js">@chad-js</a>), Franz
                  Chen&nbsp;(
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
                  Giordano&nbsp;(
                  <a href="https://github.com/frangio">@frangio</a>)
                </td>
              </tr>

              <tr>
                <td className="eipnum">
                  <a href="/EIPS/eip-5827">5827</a>
                </td>

                <td className="title">Auto-renewable allowance extension</td>
                <td className="author">
                  zlace&nbsp;(<a href="https://github.com/zlace0x">@zlace0x</a>
                  ), zhongfu&nbsp;(
                  <a href="https://github.com/zhongfu">@zhongfu</a>),
                  edison0xyz&nbsp;(
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
                  Erhard Dinhobl&nbsp;(
                  <a href="https://github.com/mrqc">@mrqc</a>), Kevin
                  Riedl&nbsp;(<a href="https://github.com/wsdt">@wsdt</a>)
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
                  Elia&nbsp;(<a href="https://github.com/eliakemp">@eliakemp</a>
                  )
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
                  <a href="https://github.com/crisgarner">@crisgarner</a>),
                  Simon Fremaux&nbsp;(
                  <a href="https://github.com/dievardump">@dievardump</a>),
                  David Huber&nbsp;(
                  <a href="https://github.com/cxkoda">@cxkoda</a>), and Arran
                  Schlosberg&nbsp;(
                  <a href="https://github.com/aschlosberg">@aschlosberg</a>)
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
                  Danny Ryan&nbsp;(
                  <a href="https://github.com/djrtwo">@djrtwo</a>)
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
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}
