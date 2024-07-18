'use client'
import '../style.css'
export default function ForNetworkingPage() {
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

        <h1 className="post-title">Networking</h1>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}
