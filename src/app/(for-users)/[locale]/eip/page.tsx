'use client'

import './style.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'

export default function ForEIPPage() {
  return (
    <div className="w-full gap-4 flex flex-col">
      <div className="wrapper">
        <a href="./eip" className="text-center">
          <h2>Ethereum Improvement Proposals</h2>
        </a>

        <div className="flex flex-row gap-4 text-xl justify-center my-4">
          <a href="./eip/all">All</a>
          <a href="./eip/core">Core</a>
          <a href="./eip/networking">Networking</a>
          <a href="./eip/interface">Interface</a>
          <a href="./eip/erc">ERC</a>
          <a href="./eip/meta">Meta</a>
          <a href="./eip/informational">Informational</a>
        </div>
        <h2>EIPs</h2>
        <p>
          Ethereum Improvement Proposals (EIPs) describe standards for the
          Ethereum platform, including core protocol specifications, client
          APIs, and contract standards. Network upgrades are discussed
          separately in the{' '}
          <a target="_blank" href="https://github.com/ethereum/pm/">
            Ethereum Project Management
          </a>{' '}
          repository.
        </p>

        <h2>Contributing</h2>
        <p>
          First review <a href="EIPS/eip-1">EIP-1</a>. Then clone the repository
          and add your EIP to it. There is a{' '}
          <a href="https://github.com/ethereum/EIPs/blob/master/eip-template.md?plain=1">
            template EIP here
          </a>
          . Then submit a Pull Request to Ethereum's{' '}
          <a href="https://github.com/ethereum/EIPs">EIPs repository</a>.
        </p>

        <h2>EIP status terms</h2>
        <ul>
          <li>
            <strong>Idea</strong> - An idea that is pre-draft. This is not
            tracked within the EIP Repository.
          </li>
          <li>
            <strong>Draft</strong> - The first formally tracked stage of an EIP
            in development. An EIP is merged by an EIP Editor into the EIP
            repository when properly formatted.
          </li>
          <li>
            <strong>Review</strong> - An EIP Author marks an EIP as ready for
            and requesting Peer Review.
          </li>
          <li>
            <strong>Last Call</strong> - This is the final review window for an
            EIP before moving to FINAL. An EIP editor will assign Last Call
            status and set a review end date (`last-call-deadline`), typically
            14 days later. If this period results in necessary normative changes
            it will revert the EIP to Review.
          </li>
          <li>
            <strong>Final</strong> - This EIP represents the final standard. A
            Final EIP exists in a state of finality and should only be updated
            to correct errata and add non-normative clarifications.
          </li>
          <li>
            <strong>Stagnant</strong> - Any EIP in Draft or Review if inactive
            for a period of 6 months or greater is moved to Stagnant. An EIP may
            be resurrected from this state by Authors or EIP Editors through
            moving it back to Draft.
          </li>
          <li>
            <strong>Withdrawn</strong> - The EIP Author(s) have withdrawn the
            proposed EIP. This state has finality and can no longer be
            resurrected using this EIP number. If the idea is pursued at later
            date it is considered a new proposal.
          </li>
          <li>
            <strong>Living</strong> - A special status for EIPs that are
            designed to be continually updated and not reach a state of
            finality. This includes most notably EIP-1.
          </li>
        </ul>

        <h2>EIP Types</h2>

        <p>
          EIPs are separated into a number of types, and each has its own list
          of EIPs.
        </p>

        <h3>Standard Track (789)</h3>
        <p>
          Describes any change that affects most or all Ethereum
          implementations, such as a change to the network protocol, a change in
          block or transaction validity rules, proposed application
          standards/conventions, or any change or addition that affects the
          interoperability of applications using Ethereum. Furthermore Standard
          EIPs can be broken down into the following categories.
        </p>

        <h4>
          <a href="/core">Core</a> (274)
        </h4>
        <p>
          Improvements requiring a consensus fork (e.g.{' '}
          <a href="./EIPS/eip-5">EIP-5</a>, <a href="./EIPS/eip-211">EIP-211</a>
          ), as well as changes that are not necessarily consensus critical but
          may be relevant to “core dev” discussions (for example, the PoA
          algorithm for testnets described in{' '}
          <a href="./EIPS/eip-225">EIP-225</a>).
        </p>

        <h4>
          <a href="/networking">Networking</a> (20)
        </h4>
        <p>
          Includes improvements around devp2p (<a href="./EIPS/eip-8">EIP-8</a>)
          and Light Ethereum Subprotocol, as well as proposed improvements to
          network protocol specifications of whisper and swarm.
        </p>

        <h4>
          <a href="/interface">Interface</a> (50)
        </h4>
        <p>
          Includes improvements around client API/RPC specifications and
          standards, and also certain language-level standards like method names
          (<a href="./EIPS/eip-6">EIP-6</a>) and contract ABIs. The label
          “interface” aligns with the interfaces repo and discussion should
          primarily occur in that repository before an EIP is submitted to the
          EIPs repository.
        </p>

        <h4>
          <a href="/erc">ERC</a> (445)
        </h4>
        <p>
          Application-level standards and conventions, including contract
          standards such as token standards (<a href="./EIPS/eip-20">EIP-20</a>
          ), name registries (<a href="./EIPS/eip-137">EIP-137</a>), URI schemes
          (<a href="./EIPS/eip-681">EIP-681</a>), library/package formats (
          <a href="./EIPS/eip-190">EIP-190</a>), and account abstraction (
          <a href="./EIPS/eip-4337">EIP-4337</a>).
        </p>

        <h3>
          <a href="/meta">Meta</a> (32)
        </h3>
        <p>
          Describes a process surrounding Ethereum or proposes a change to (or
          an event in) a process. Process EIPs are like Standards Track EIPs but
          apply to areas other than the Ethereum protocol itself. They may
          propose an implementation, but not to Ethereum's codebase; they often
          require community consensus; unlike Informational EIPs, they are more
          than recommendations, and users are typically not free to ignore them.
          Examples include procedures, guidelines, changes to the
          decision-making process, and changes to the tools or environment used
          in Ethereum development. Any meta-EIP is also considered a Process
          EIP.
        </p>

        <h3>
          <a href="/informational">Informational</a> (6)
        </h3>
        <p>
          Describes a Ethereum design issue, or provides general guidelines or
          information to the Ethereum community, but does not propose a new
          feature. Informational EIPs do not necessarily represent Ethereum
          community consensus or a recommendation, so users and implementers are
          free to ignore Informational EIPs or follow their advice.
        </p>
      </div>
    </div>
  )
}
