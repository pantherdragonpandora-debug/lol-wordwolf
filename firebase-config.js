/* ========================================
   SNSシェアボタンスタイル
   ======================================== */

.share-container {
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-md);
    border-radius: 12px;
    background: rgba(30, 35, 40, 0.6);
    border: 2px solid rgba(200, 155, 60, 0.3);
}

.share-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-light);
    margin-bottom: var(--spacing-md);
    text-align: center;
}

.share-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.share-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    min-width: 120px;
}

.share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.share-btn:active {
    transform: translateY(0);
}

/* Twitter/X */
.share-btn-twitter {
    background: linear-gradient(135deg, #1DA1F2, #0d8bd9);
}

.share-btn-twitter:hover {
    background: linear-gradient(135deg, #0d8bd9, #0a7bc4);
}

/* LINE */
.share-btn-line {
    background: linear-gradient(135deg, #00B900, #009900);
}

.share-btn-line:hover {
    background: linear-gradient(135deg, #009900, #007700);
}

/* Facebook */
.share-btn-facebook {
    background: linear-gradient(135deg, #1877F2, #0d5ebd);
}

.share-btn-facebook:hover {
    background: linear-gradient(135deg, #0d5ebd, #0a4a99);
}

/* クリップボード */
.share-btn-copy {
    background: linear-gradient(135deg, #6c757d, #5a6268);
}

.share-btn-copy:hover {
    background: linear-gradient(135deg, #5a6268, #4e555b);
}

.share-btn-copy.copied {
    background: linear-gradient(135deg, #28a745, #218838);
}

/* アイコン */
.share-icon {
    font-size: 1.2rem;
}

/* シェアテキストプレビュー */
.share-preview {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    border-left: 4px solid var(--gold);
}

.share-preview-title {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 8px;
}

.share-preview-text {
    font-size: 0.95rem;
    color: var(--text-light);
    line-height: 1.6;
    white-space: pre-wrap;
}

/* モバイル対応 */
@media (max-width: 768px) {
    .share-buttons {
        flex-direction: column;
        width: 100%;
    }

    .share-btn {
        width: 100%;
        max-width: 300px;
    }

    .share-title {
        font-size: 1rem;
    }
}

/* アニメーション */
@keyframes shareSuccess {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.share-btn.success {
    animation: shareSuccess 0.5s ease;
}
