'use client'
import '../style.css'
export default function ForMetaPage() {
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
            <h1 className="post-title">Meta</h1>
          </header>

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
                  <a href="mailto:mb@ethereum.org">mb@ethereum.org</a>&gt;,
                  Hudson Jameson&nbsp;&lt;
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
                  Wilson&nbsp;(
                  <a href="https://github.com/SamWilsn">@SamWilsn</a>), et al.
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
                  <a href="https://github.com/adietrichs">@adietrichs</a>),
                  Danny Ryan&nbsp;(
                  <a href="https://github.com/djrtwo">@djrtwo</a>), Tim
                  Beiko&nbsp;(
                  <a href="https://github.com/timbeiko">@timbeiko</a>)
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
                  Ferrin&nbsp;(<a href="https://github.com/shemnon">@shemnon</a>
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
                  <a href="/EIPS/eip-7723">7723</a>
                </td>

                <td className="title">Network Upgrade Inclusion Stages</td>
                <td className="author">
                  Tim Beiko&nbsp;(
                  <a href="https://github.com/timbeiko">@timbeiko</a>)
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
                  <a href="/EIPS/eip-867">867</a>
                </td>

                <td className="title">
                  Standardized Ethereum Recovery Proposals
                </td>
                <td className="author">
                  Dan Phifer&nbsp;&lt;
                  <a href="mailto:dp@musiconomi.com">dp@musiconomi.com</a>&gt;,
                  James Levy&nbsp;&lt;
                  <a href="mailto:james@taptrust.com">james@taptrust.com</a>
                  &gt;, Reuben Youngblom&nbsp;&lt;
                  <a href="mailto:reuben@taptrust.com">reuben@taptrust.com</a>
                  &gt;
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
                  <a href="/EIPS/eip-2657">2657</a>
                </td>

                <td className="title">Ephemeral Testnet Yolo</td>
                <td className="author">
                  James Hancock&nbsp;(
                  <a href="https://github.com/madeoftin">@madeoftin</a>)
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
                  <a href="/EIPS/eip-7199">7199</a>
                </td>

                <td className="title">Linter Scope</td>
                <td className="author">
                  Zainan Victor Zhou&nbsp;(
                  <a href="https://github.com/xinbenlv">@xinbenlv</a>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}
