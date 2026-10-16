import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

// Placeholder art (Docusaurus's own undraw SVGs) — swap for real The
// Roadside Emporium illustrations once the content pass (knolocal#287)
// replaces these three placeholder blurbs with real article links.
const FeatureList: FeatureItem[] = [
  {
    title: 'Find Vendors & Markets',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Browse the map or search by product, filter by open status, and get
        directions — no account needed.
      </>
    ),
  },
  {
    title: 'List or Claim Your Business',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Add a brand-new stand, or claim an existing listing that's already
        on The Roadside Emporium but not yet claimed.
      </>
    ),
  },
  {
    title: 'Manage Your Listing',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Edit your details, hours, and photos, and see your views and
        directions stats once you own a listing.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
