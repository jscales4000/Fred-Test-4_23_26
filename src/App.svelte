<script lang="ts">
  import { onMount } from 'svelte';
  import {
    audioMuted,
    display1Selected,
    display2Selected,
    panelOnline,
    roomPowerOn,
    selectDisplaySource,
    toggleAudioMute,
    toggleRoomPower,
    volumeDown,
    volumeUp
  } from './lib/stores/signals';
  import { ROOM_NAME, SOURCE_LABELS } from './lib/contract';

  const BASE_WIDTH = 1280;
  const BASE_HEIGHT = 800;
  const DEVICE_PROFILES = {
    auto: null,
    tsw770: { width: 1280, height: 800, label: 'TSW-770' },
    tsw1070: { width: 1920, height: 1200, label: 'TSW-1070' }
  } as const;

  const [pc, pcExt, appleTv, airMedia, laptop, usbC] = SOURCE_LABELS;
  let previewMode: keyof typeof DEVICE_PROFILES = 'auto';
  let viewportLabel = `${BASE_WIDTH}x${BASE_HEIGHT}`;
  let scaleLabel = '1.00x';
  let profileLabel = 'Auto';
  let showPreviewDock = false;
  let applyViewport = () => {};

  function setPreviewMode(mode: keyof typeof DEVICE_PROFILES) {
    previewMode = mode;
    applyViewport();
  }

  onMount(() => {
    showPreviewDock = ['127.0.0.1', 'localhost'].includes(window.location.hostname);

    applyViewport = () => {
      const profile = DEVICE_PROFILES[previewMode];
      const viewportWidth = profile?.width ?? window.innerWidth;
      const viewportHeight = profile?.height ?? window.innerHeight;
      const scale = Math.min(viewportWidth / BASE_WIDTH, viewportHeight / BASE_HEIGHT);

      document.documentElement.style.setProperty('--panel-scale', scale.toString());
      document.documentElement.style.setProperty('--viewport-width', `${viewportWidth}px`);
      document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);

      viewportLabel = `${viewportWidth}x${viewportHeight}`;
      scaleLabel = `${scale.toFixed(2)}x`;
      profileLabel = profile?.label ?? 'Auto';
    };

    applyViewport();
    window.addEventListener('resize', applyViewport);

    return () => {
      window.removeEventListener('resize', applyViewport);
    };
  });
</script>

<svelte:head>
  <title>CodexClass CH5 Panel</title>
</svelte:head>

<div class="panel-stage">
  <div class="app-shell">
    <header class="app-header glass-card">
      <div class="header-copy">
        <p class="eyebrow">Classroom Control</p>
        <h1>{ROOM_NAME}</h1>
      </div>
      <div class="status-pill" class:online={$panelOnline} aria-live="polite">
        <span class="status-dot"></span>
        <span>{$panelOnline ? 'Online' : 'Offline'}</span>
      </div>
    </header>

    <main class="display-grid">
      <section class="display-card glass-card" aria-labelledby="display-1-title">
        <div class="display-heading">
          <div>
            <p class="display-label">Display 1</p>
            <h2 id="display-1-title">Front Display</h2>
          </div>
          <p class="active-source">Active: {SOURCE_LABELS[$display1Selected - 1] ?? 'None'}</p>
        </div>
        <div class="sources-grid">
          <button class="source-button btn" class:active={$display1Selected === 1} onclick={() => selectDisplaySource(1, 1)} aria-pressed={$display1Selected === 1}>{pc}</button>
          <button class="source-button btn" class:active={$display1Selected === 2} onclick={() => selectDisplaySource(1, 2)} aria-pressed={$display1Selected === 2}>{pcExt}</button>
          <button class="source-button btn" class:active={$display1Selected === 3} onclick={() => selectDisplaySource(1, 3)} aria-pressed={$display1Selected === 3}>{appleTv}</button>
          <button class="source-button btn" class:active={$display1Selected === 4} onclick={() => selectDisplaySource(1, 4)} aria-pressed={$display1Selected === 4}>{airMedia}</button>
          <button class="source-button btn" class:active={$display1Selected === 5} onclick={() => selectDisplaySource(1, 5)} aria-pressed={$display1Selected === 5}>{laptop}</button>
          <button class="source-button btn" class:active={$display1Selected === 6} onclick={() => selectDisplaySource(1, 6)} aria-pressed={$display1Selected === 6}>{usbC}</button>
        </div>
      </section>

      <section class="display-card glass-card" aria-labelledby="display-2-title">
        <div class="display-heading">
          <div>
            <p class="display-label">Display 2</p>
            <h2 id="display-2-title">Rear Display</h2>
          </div>
          <p class="active-source">Active: {SOURCE_LABELS[$display2Selected - 1] ?? 'None'}</p>
        </div>
        <div class="sources-grid">
          <button class="source-button btn" class:active={$display2Selected === 1} onclick={() => selectDisplaySource(2, 1)} aria-pressed={$display2Selected === 1}>{pc}</button>
          <button class="source-button btn" class:active={$display2Selected === 2} onclick={() => selectDisplaySource(2, 2)} aria-pressed={$display2Selected === 2}>{pcExt}</button>
          <button class="source-button btn" class:active={$display2Selected === 3} onclick={() => selectDisplaySource(2, 3)} aria-pressed={$display2Selected === 3}>{appleTv}</button>
          <button class="source-button btn" class:active={$display2Selected === 4} onclick={() => selectDisplaySource(2, 4)} aria-pressed={$display2Selected === 4}>{airMedia}</button>
          <button class="source-button btn" class:active={$display2Selected === 5} onclick={() => selectDisplaySource(2, 5)} aria-pressed={$display2Selected === 5}>{laptop}</button>
          <button class="source-button btn" class:active={$display2Selected === 6} onclick={() => selectDisplaySource(2, 6)} aria-pressed={$display2Selected === 6}>{usbC}</button>
        </div>
      </section>
    </main>

    <footer class="app-footer glass-card">
      <button class="footer-power btn" class:active={$roomPowerOn} onclick={toggleRoomPower} aria-pressed={$roomPowerOn}>
        <span class="footer-label">Room Power</span>
        <strong>{$roomPowerOn ? 'On' : 'Off'}</strong>
      </button>

      <div class="audio-cluster" role="group" aria-label="Master audio controls">
        <button class="audio-button btn" onclick={volumeDown} aria-label="Volume down">Vol-</button>
        <button class="audio-button btn" onclick={volumeUp} aria-label="Volume up">Vol+</button>
        <button class="audio-button btn" class:active={$audioMuted} onclick={toggleAudioMute} aria-pressed={$audioMuted}>Mute</button>
      </div>
    </footer>
  </div>

  {#if showPreviewDock}
    <aside class="preview-dock glass-card" aria-label="Local resolution preview controls">
      <div class="preview-copy">
        <strong>{profileLabel}</strong>
        <span>{viewportLabel} · {scaleLabel}</span>
      </div>
      <div class="preview-actions">
        <button class="preview-button btn" class:active={previewMode === 'auto'} onclick={() => setPreviewMode('auto')}>Auto</button>
        <button class="preview-button btn" class:active={previewMode === 'tsw770'} onclick={() => setPreviewMode('tsw770')}>770</button>
        <button class="preview-button btn" class:active={previewMode === 'tsw1070'} onclick={() => setPreviewMode('tsw1070')}>1070</button>
      </div>
    </aside>
  {/if}
</div>
