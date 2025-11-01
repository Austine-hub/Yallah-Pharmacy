import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BlogSection.module.css';

interface BlogPost {
  id: string;
  image: string;
  title: string;
  link: string;
}

const BlogSection: React.FC = () => {
  const navigate = useNavigate();

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      image: '/blog1.png',
      title: "Understanding Toxins and Your Body's Natural Detox System",
      link: '/blog/toxins-natural-detox-system'
    },
    {
      id: '2',
      image: '/blog2.png',
      title: 'Understanding Down Syndrome: Insights, Development and Health Considerations',
      link: '/blog/down-syndrome-insights'
    },
    {
      id: '3',
      image: '/blog3.png',
      title: 'Age with grace: Exploring the different facets of aging and techniques to slow the clock',
      link: '/blog/aging-gracefully'
    },
    {
      id: '4',
      image: '/blog4.png',
      title: 'What you need to know about super gonorrhea and how to protect yourself',
      link: '/blog/super-gonorrhea-protection'
    }
  ];

  const handlePostClick = (link: string) => {
    navigate(link);
  };

  const handleReadMore = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    navigate(link);
  };

  return (
    <section className={styles.blogSection}>
      <header className={styles.blogHeader}>
        <a href="/blog" className={styles.blogHeaderLink}>
          Read Our Blog & Learn How to Live Well →
        </a>
      </header>
      
      <div className={styles.blogGrid}>
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className={styles.blogCard}
            onClick={() => handlePostClick(post.link)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handlePostClick(post.link);
              }
            }}
          >
            <div className={styles.imageWrapper}>
              <img
                src={post.image}
                alt={post.title}
                className={styles.blogImage}
              />
            </div>
            
            <div className={styles.contentWrapper}>
              <h3 className={styles.blogTitle}>{post.title}</h3>
              
              <button
                className={styles.readMoreBtn}
                onClick={(e) => handleReadMore(e, post.link)}
                aria-label={`Read more about ${post.title}`}
              >
                read more
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;