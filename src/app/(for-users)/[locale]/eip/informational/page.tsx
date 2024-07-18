'use client'
import '../style.css'
export default function ForInfoPage() {
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
            <h1 className="post-title">Informational</h1>
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
                  <a href="/EIPS/eip-2982">2982</a>
                </td>

                <td className="title">Serenity Phase 0</td>
                <td className="author">
                  Danny Ryan&nbsp;(
                  <a href="https://github.com/djrtwo">@djrtwo</a>), Vitalik
                  Buterin&nbsp;(
                  <a href="https://github.com/vbuterin">@vbuterin</a>)
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
                  <a href="/EIPS/eip-2458">2458</a>
                </td>

                <td className="title">Updates and Updated-by Header</td>
                <td className="author">
                  Edson Ayllon&nbsp;(
                  <a href="https://github.com/edsonayllon">@edsonayllon</a>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}
